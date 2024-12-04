import { SIGNAL } from "./enum"
import { PassType } from "../utils/common"
import { formartClass as FM } from "../utils/formart"

export { }

declare global {
    var protect: (mPtr: NativePointer) => void
    var watchMemory: (mPtr: NativePointer, length?: number) => void
    var watchDisabled: () => void
    var patchTest: (mPtr: NativePointer, size?: number) => void
    var findInMemory: (typeStr: "Dex" | "Dex1" | "PNG" | "global-metadata.dat" | string, scanSync?: boolean) => void
    var fridaInfo: () => void
    var listThreads: (maxCountThreads?: number) => void

    var currentThreadName: () => string

    // 下面这三个用于frida配合lldb更方便的断点
    var raise: (sign: SIGNAL) => number
    var InsLoop: (insPtr: number | NativePointer) => void
    var InsPass: (insPtr: number | NativePointer) => void

    var listModules: (filterName?: string) => void
    var listModule: (moduleName: string, printItems?: number) => void

    var b_export: (moduleName: string, exportName?: string) => void

    /**
     * findExport 侧重点在定位一些我们只知道函数名不知道他在那个模块里面（用于定位导出函数）
     * 故exportName作为第一个参数，第二个参数用作筛选
     * 
     * example:
     * findExport("Java_")
     * findExport("art::StackVisitor::","libart.so",null,true)
     * findExport("art::ArtMethod::","libart.so",(exp,dm)=>{LOGD("\n"+exp.address +" -> "+ dm);LOGZ("\t"+exp.name)},true)
     * 
     */
    var findExport: (exportName: string, moduleName?: string, callback?: (exp: ModuleExportDetails | ModuleSymbolDetails) => void) => void
    /**
     * findImport 侧重点在像IDA一样方便的查看指定Module的导入函数
     * 故ModuleName作为第一个参数，第二个参数用作筛选
     */
    var findImport: (moduleName: string, importName?: string) => void

    /**
     * Stalker Trace Event (单独关键点追踪)
     */
    var StalkerTraceEvent: (mPtr: NativePointer, range: NativePointer[] | undefined) => void
    /**
     * Stalker Trace Path (配合IDA标注程序执行路线)
     */
    var StalkerTracePath: (mPtr: NativePointer, range: NativePointer[] | undefined) => void

    var cmdouleTest: () => void
    var sqliteTest: () => void
    // var registerClassTest: () => void

    var demangleName: (expName: string) => string

    var packApiResove: (patter?: string) => void
}

/**
 *  b_export("Load", "libcocos2djs.so")
 */
let cacheMethods = new Map<string, number>()
globalThis.b_export = (moduleName: string, exportName?: string, passAddress?: number[]) => {
    findExport(moduleName, exportName, (exp: ModuleExportDetails | ModuleSymbolDetails) => {
        if (exp.type != "function") return
        if (passAddress == undefined) {
            innerAttach(exp as ModuleExportDetails)
        } else {
            if (!passAddress!.includes(exp.address.toInt32())) {
                innerAttach(exp as ModuleExportDetails)
            }
        }
    })

    function innerAttach(exp: ModuleExportDetails) {
        try {
            let lis: InvocationListener = Interceptor.attach(exp.address, {
                onEnter: function (args) {
                    cacheMethods.get(exp.name) ? cacheMethods.set(exp.name, cacheMethods.get(exp.name)! + 1) : cacheMethods.set(exp.name, 1)
                    if (cacheMethods.get(exp.name)! > 10) lis.detach()
                    LOGD(`Called : ${exp.name} @ ${exp.address} \nargs : ${args[0]} ${args[1]} ${args[2]} ${args[3]}`)
                }
            })
            LOGD(`Hooked : ${exp.name} @ ${exp.address} | ${exp.address.sub(Process.findModuleByAddress(exp.address)!.base)}`)
        } catch (e) {
            LOGE(`Hooked : ${exp.name} @ ${exp.address} | ${exp.address.sub(Process.findModuleByAddress(exp.address)!.base)}\n${e}`)
        }
    }
}

globalThis.protect = (mPtr: NativePointer, size: number = 0x1000, protection: PageProtection = "rwx") => {
    mPtr = checkPointer(mPtr).shr(3 * 4).shl(3 * 4)
    Memory.protect(mPtr, size, protection)
}

/**
 * frida API 实现的内存断点的封装
 * @param {NativePointer} mPtr 断点地址 
 * @param {number} length 长度
 */
globalThis.watchMemory = (mPtr: NativePointer, length: number = 0x10) => {

    class MenRange implements MemoryAccessRange {
        base: NativePointer
        size: number
        constructor(base: NativePointer, size: number) {
            this.base = checkPointer(base)
            this.size = size
        }
    }

    class MemoryDetails implements MemoryAccessDetails {
        operation: MemoryOperation      // operation: 触发这次访问的操作类型, 仅限于 read, write, execute
        from: NativePointer             // from: NativePointer 类型的触发这次访问的指令的地址
        address: NativePointer          // address: NativePointer 类型的被访问的地址
        rangeIndex: number              // rangeIndex: 被访问的内存范围的索引
        pageIndex: number               // pageIndex: 被访问的页的索引
        pagesCompleted: number          // pagesCompleted: 到目前为止已访问(并且不再受监控)的内存页总数
        pagesTotal: number              // pagesTotal: 被访问的内存范围的总页数
        private mdFrom: Module
        private mdAddress: Module

        constructor(detail: MemoryAccessDetails) {
            this.operation = detail.operation
            this.from = detail.from
            this.address = detail.address
            this.rangeIndex = detail.rangeIndex
            this.pageIndex = detail.pageIndex
            this.pagesCompleted = detail.pagesCompleted
            this.pagesTotal = detail.pagesTotal
            this.mdAddress = Process.findModuleByAddress(this.address)!
            this.mdFrom = Process.findModuleByAddress(this.from)!
        }

        public tostring(): string {
            return `
operation:\t\t${this.operation}
from:\t\t\t${this.from} { ${this.from.sub(this.mdFrom.base)} @ ${this.mdFrom.name} }
address:\t\t${this.address} { ${this.address.sub(this.mdAddress.base)} @ ${this.mdAddress.name} }
rangeIndex:\t\t${this.rangeIndex}
pageIndex:\t\t${this.pageIndex}
pagesCompleted:\t\t${this.pagesCompleted}
pagesTotal:\t\t${this.pagesTotal}`
        }
    }

    // 监控一个或多个内存范围的访问情况, 并且在每个内存页第一次访问时触发回调函数 (onAccess)
    MemoryAccessMonitor.enable(new MenRange(mPtr, length), {
        // tips：如果同时对一个地址attach和watch则运行到该点时会崩溃 使用watch时注意先detach掉这个点的hook
        onAccess: (access: MemoryAccessDetails) => LOGD(new MemoryDetails(access).tostring())
    })
}

globalThis.watchDisabled = () => MemoryAccessMonitor.disable()

globalThis.sqliteTest = () => {
    var db, smt, row, name, bio;
    db = SqliteDatabase.open('/path/to/people.db');
    smt = db.prepare('SELECT name, bio FROM people WHERE age = ?');
    console.log('People whose age is 42:');
    smt.bindInteger(1, 42);
    while ((row = smt.step()) !== null) {
        name = row[0];
        bio = row[1];
        console.log('Name:', name);
        console.log('Bio:', bio);
    }
    smt.reset()
}

globalThis.findInMemory = (pattern: "Dex" | "Dex1" | "PNG" | "global-metadata.dat" | string, scanSync: boolean = false) => {
    switch (pattern) {
        case "Dex1":
            find("54 61 70 20 54 6F 20 53 74 61 72 74", (pattern, address, size) => {
                LOG('Found "DEX ' + pattern + " Address: " + address.toString() + "\n", LogColor.C36)
            })
            break
        case "Dex":
            find("64 65 78 0a 30 33 35 00", (pattern, address, size) => {
                // TODO
                LOG('Found "DEX"' + pattern + " Address: " + address.toString() + "\n", LogColor.C36)
            })
            break
        case "PNG":
            Process.enumerateRanges("r--").forEach((item) => {
                new Promise((onFound) => {
                    Memory.scan(item.base, item.size, "89 50 4E 47 0D 0A 1A 0A", {
                        onMatch: function (addressStart) {
                            onFound(addressStart)
                        },
                        onComplete: function () { }
                    })
                }).then(addressStart => {
                    // 同步方式效率太低
                    // let tmpResult = Memory.scanSync(ptr(addressStart), 8 * 1024, "00 00 00 00 49 45 4E 44 AE 42 60 82") 
                    new Promise((onFound) => {
                        Memory.scan(item.base, item.size, "00 00 00 00 49 45 4E 44 AE 42 60 82", {
                            onMatch: function (addressEnd) {
                                onFound(addressEnd)
                                return "stop"
                            },
                            onComplete: function () { }
                        })
                    }).then(value => {
                        return [addressStart, value]
                    }).then((result) => {
                        let tRes = result as NativePointer[]
                        let off = tRes[1].sub(tRes[0])
                        result[3] = off
                        LOG("\n" + getLine(60) + "\n[*] Found PNG From " + result[0] + " To " + result[1] + "  size : " + off + "(" + off.toInt32() + ")", LogColor.C36)
                        // arm 是小端模式 所以这里是字节顺序是大端 （Object下拓展了一个函数用来倒序 toInt32Big）
                        let x = toInt32Big(tRes[0].add(p_size * 4).readPointer()).toInt32()
                        let y = toInt32Big(tRes[0].add(p_size * 5).readPointer()).toInt32()
                        let dep = tRes[0].add(p_size * 6).readU8()
                        let type = tRes[0].add(p_size * 6 + 1).readU8()
                        let sig = toInt32Big(tRes[0].add(p_size * 7 + 1).readPointer())
                        LOG("\t (" + x + " X " + y + ") \t" + dep + " " + type + "\t" + sig, LogColor.C36)
                        return tRes
                    }).then(result => {
                        let tRes = result as NativePointer[]
                        let length = tRes[3].add(12).toInt32()
                        if (length <= 0) return
                        Memory.protect(tRes[0], 0xFFFF, "rwx")
                        let path = "/data/data/" + getPkgName() + "/" + result[0] + "_" + result[1] + ".png"
                        let file = new File(path, "wb")
                        let bytes = result[0].readByteArray(length)
                        if (length != 0 && bytes != null) file.write(bytes)
                        file.flush()
                        file.close()
                        LOGD('\tSave to\t\t===>\t' + path)
                    }).catch(err => {
                        LOGE(err)
                    })
                })
            })
            break
        case "global-metadata.dat":
            find("AF 1B B1 FA 18", (pattern, address, size) => {
                LOGE("\n" + getLine(80))
                LOGD('Found "global-metadata.dat"' + pattern + " Address: " + address.toString() + "\n")
                seeHexA(address, 64, true, LogColor.C33)

                let DefinitionsOffset = parseInt(address.toString(), 16) + 0x108;
                let DefinitionsOffset_size = ptr(DefinitionsOffset).readInt()

                let DefinitionsCount = parseInt(address.toString(), 16) + 0x10C;
                let DefinitionsCount_size = ptr(DefinitionsCount).readInt()

                // 根据两个偏移得出global-metadata大小
                let global_metadata_size = DefinitionsOffset_size + DefinitionsCount_size
                LOGD("\nFile size\t===>\t" + global_metadata_size + "B (" + (global_metadata_size / 1024 / 1024).toFixed(2) + "MB)")
                // 只保留大于两兆的文件
                if (global_metadata_size > 1024 * 1024 * 2) {
                    let path = "/data/data/" + getPkgName() + "/global-metadata.dat"
                    let file = new File(path, "wb")
                    let bytes = address.readByteArray(global_metadata_size)
                    if (global_metadata_size != 0 && bytes != null) file.write(bytes)
                    file.flush()
                    file.close()
                    LOGD('Save to\t\t===>\t' + path)
                }
                LOGD(getLine(80))
            })
            break
        default:
            let md = Process.findModuleByName("libil2cpp.so")
            if (md == null) {
                LOGE("NOT FOUND Module : libil2cpp.so")
                break
            } else {
                LOGW(JSON.stringify(m) + "\n")
            }
            if (scanSync) {
                let results = Memory.scanSync(md.base, md.size, pattern)
                LOGD("onMatch result = \n" + JSON.stringify(results))
            } else {
                Memory.scan(md.base, md.size, pattern, {
                    onMatch: function (address, size) {
                        LOGD("[*] Found at " + address + " with size " + size)
                        return 'stop'
                    },
                    onComplete: function () {
                        LOGE("onComplete")
                    }
                })
            }
            break
    }

    function toInt32Big(mPtr: NativePointer | number) {
        let resultStr: string = ""
        var aimStr = String(mPtr).split("0x")[1]
        for (let i = aimStr.length - 1; i >= 0; i--)
            resultStr += aimStr.charAt(i)
        return ptr("0x" + resultStr)
    }

    function find(pattern: string, callback: (pattern: string, address: NativePointer, size: number) => void) {
        LOG("Start Find Pattern '" + pattern + "'\nWatting ......", LogColor.C96)
        // 代码都是位于只读段
        let addrArray: RangeDetails[] = Process.enumerateRanges("r--")
        let length: number = addrArray.length
        let index: number = 0
        addrArray.forEach((item) => {
            Memory.scan(item.base, item.size, pattern, {
                onMatch: function (address, size) {
                    callback(pattern, address, size)
                    return "stop"
                },
                onComplete: function () {
                    LOGE(`onComplete ${index++}/${length}`)
                    clear()
                }
            })
        })
    }

    function getPkgName() {
        let retStr = ""
        Java.perform(() => retStr = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getPackageName())
        return retStr
    }
}

globalThis.fridaInfo = () => {
    LOGD(`\n${getLine(40)}`)
    LOGD(`[*] Runtime : ${Script.runtime}`)
    LOGD(`[*] ThreadId : ${Process.getCurrentThreadId()}`)
    LOGD(`[*] Process.id : ${Process.id}`)
    LOGD(`[*] Process.arch : ${Process.arch}`)
    LOGD(`[*] Process.platform : ${Process.platform}`)
    LOGD(`[*] Process.pointerSize : ${Process.pointerSize}`)
    LOGD(`[*] Process.pageSize : ${Process.pageSize}`)
    LOGD(`[*] Process.codeSigningPolicy : ${Process.codeSigningPolicy}`)
    LOGD(`[*] Process.isDebuggerAttached : ${Process.isDebuggerAttached()}`)
    LOGD(`${getLine(40)}\n`)
}

export function getThreadName(tid: number = Process.id) {
    let threadName: string = "unknown"
    try {
        var file = new File("/proc/self/task/" + tid + "/comm", "r")
        threadName = file.readLine().toString().trimEnd()
        file.close()
    } catch (e) { throw e }

    // var threadNamePtr: NativePointer = Memory.alloc(0x40)
    // var tid_p: NativePointer = Memory.alloc(p_size).writePointer(ptr(tid))
    // var pthread_getname_np = new NativeFunction(Module.findExportByName("libc.so", 'pthread_getname_np')!, 'int', ['pointer', 'pointer', 'int'])
    // pthread_getname_np(ptr(tid), threadNamePtr, 0x40)
    // threadName = threadNamePtr.readCString()!

    return threadName
}

globalThis.currentThreadName = (): string => {
    let tid = Process.getCurrentThreadId()
    return getThreadName(tid).toString()
}

globalThis.raise = (sign: SIGNAL = SIGNAL.SIGSTOP): number => {
    let raise = new NativeFunction(Module.findExportByName("libc.so", 'raise')!, 'int', ['int'])
    return raise(sign)
}

var cacheIns = new Map<string, ArrayBuffer>()
globalThis.InsLoop = (insPtr: number | NativePointer) => {
    let insLocal: NativePointer = checkPointer(insPtr)
    cacheIns.set(insLocal.toString(), insLocal.readByteArray(4)!)
    Memory.patchCode(insLocal, 4, (code: NativePointer) => {
        // bl 0x0
        let writer: ArmWriter | Arm64Writer
        if (Process.arch == "arm") {
            writer = new ArmWriter(code)
        } else if (Process.arch == "arm64") {
            writer = new Arm64Writer(code)
        } else throw new Error("NOT SUPPORT ARCH : " + Process.arch)
        writer.putBranchAddress(insLocal)
        writer.flush()
    })
}

globalThis.InsPass = (insPtr: number | NativePointer) => {
    let insLocal: NativePointer = checkPointer(insPtr)
    let insBytes = cacheIns.get(insLocal.toString())!
    Memory.patchCode(insLocal, 4, (code: NativePointer) => {
        code.writeByteArray(insBytes)
    })
}

let index_threads: number
globalThis.listThreads = (maxCountThreads: number = 20) => {
    index_threads = 0
    let current = Process.getCurrentThreadId()
    Process.enumerateThreads()
        .sort((a, b) => b.id - a.id)
        .slice(0, maxCountThreads)
        .forEach((thread: ThreadDetails) => {
            let indexText = FM.alignStr(`[${++index_threads}]`, 6)
            let text = `${indexText} ${thread.id} ${thread.state} | ${getThreadName(thread.id)}`
            let ctx = thread.context
            current == thread.id ? LOGE(text) : LOGD(text)
            LOGZ(`\tPC : ${ctx.pc}  ${checkCtx(ctx, "PC")}`)
            LOGZ(`\tLR : ${getPlatformCtx(ctx).lr}  ${checkCtx(ctx, "LR")}`)
        })
}

let index: number
globalThis.listModules = (filterName: string = "") => {
    index = 0
    Process.enumerateModules().forEach((md: Module) => {
        if (md.name.includes(filterName)) printModule(md, true)
    })
}

globalThis.listModule = (moduleName: string, printItems: number = 5) => {

    let md = Process.getModuleByName(moduleName)
    if (md == null) {
        LOGE("NOT FOUND Module : " + moduleName)
        return
    }
    printModule(md, false)
    if (moduleName == "linker") return

    let protection: PageProtection = "" // all , r , w , x
    let range = md.enumerateRanges(protection)
    if (range.length > 0) {
        LOGO(`\t[-] enumerateRanges ( ${range.length} )`)
        range.sort((f: RangeDetails, s: RangeDetails) => f.base.compare(s.base))
            .forEach((item: RangeDetails) => {
                LOGZ(`\t\t${item.protection}\t${item.base} - ${item.base.add(item.size)} | ${FM.alignStr(String(ptr(item.size)), p_size + 8)} <- ${item.size}`)
            })
        newLine()
    }

    let imp = md.enumerateImports()
    if (imp.length > 0) {
        LOGO(`\t[-] enumerateImports ( ${imp.length} )`)
        let arrTmpRecord: Array<string> = []
        imp.sort((a: ModuleImportDetails, b: ModuleImportDetails) => a.name.length - b.name.length)
            .slice(0, printItems).forEach((item: ModuleImportDetails) => {
                let address = FM.alignStr(String(item.address), p_size + 8)
                let importFromDes: string = "\t<---\t"
                try {
                    let tmd = Process.findModuleByAddress(item.address!)! //this can throw exception
                    let baseStr = ` @ ${tmd.base}`
                    if (item.type == "function" || item.type == "variable") // not undefined
                        importFromDes += `${tmd.name} ${arrTmpRecord.includes(tmd.name) ? FM.centerStr("...", baseStr.length) : baseStr}` //show base once
                    arrTmpRecord.push(tmd.name)
                } catch { importFromDes = "" }
                LOGZ(`\t\t${item.type}   ${address}  ${item.name} ${importFromDes}`)
            })
        if (imp.length > printItems) LOGZ("\t\t......\n")
    }

    let exp = md.enumerateExports()
    if (exp.length > 0) {
        LOGO(`\t[-] enumerateExports ( ${exp.length} )`)
        exp.sort((a: ModuleExportDetails, b: ModuleExportDetails) => a.name.length - b.name.length)
            .slice(0, printItems).forEach((item: ModuleExportDetails) => {
                let address = FM.alignStr(String(item.address), p_size + 8)
                LOGZ(`\t\t${item.type}   ${address}  ${item.name}`)
            })
        if (exp.length > printItems) LOGZ("\t\t......\n")
    }

    let sym = md.enumerateSymbols()
    if (sym.length > 0) {
        LOGO(`\t[-] enumerateSymbols ( ${sym.length} )`)
        sym.slice(0, printItems).forEach((item: ModuleSymbolDetails) => {
            LOGZ(`\t\t${item.isGlobal}  ${item.type}  ${item.name}  ${item.address}`)
        })
        if (sym.length > printItems) LOGZ("\t\t......\n")
    }
}

// 局部函数 打印模块信息
function printModule(md: Module, needIndex: boolean = false) {
    needIndex == true ? LOGD(`\n[${++index}]\t${md.name}`) : LOGD(`\n[*]\t${md.name}`)
    // 保留三位小数
    let fileLen = getFileLenth(md.path)
    let size = Math.round(md.size / 1024 / 1024 * 100) / 100
    let fileLenFormat = Math.round(fileLen / 1024 / 1024 * 100) / 100
    let extendFileLen = fileLen == 0 ? "" : `| FILE: ${fileLen} B ≈ ${fileLenFormat} MB `
    LOGZ(`\t${md.base} - ${(md.base.add(md.size))}  | MEM: ${ptr(md.size)} ( ${md.size} B = ${md.size / 1024} KB ≈ ${size} MB ) ${extendFileLen}`)
    LOGZ(`\t${md.path}\n`)
}

globalThis.findExport = (exportName: string, moduleName?: string, callback?: (exp: ModuleExportDetails | ModuleSymbolDetails, demangleName?: string) => void, checkDemangleName: boolean = false, findSym: boolean = false) => {
    if (callback == undefined) callback = showDetails
    var count = 0
    if (moduleName == undefined) {
        if (findSym) {
            Process.enumerateModules().forEach((md: Module) => {
                md.enumerateSymbols().filter((sym: ModuleSymbolDetails) => sym.name.includes(exportName)).forEach((sym: ModuleSymbolDetails) => checkAndShow(sym, callback))
            })
        } else {
            Process.enumerateModules().forEach((md: Module) => {
                md.enumerateExports().forEach((exp: ModuleExportDetails) => checkAndShow(exp, callback))
            })
        }
    } else {
        let md: Module | null = Process.findModuleByName(moduleName)
        if (md == null) throw new Error("NOT FOUND Module : " + moduleName)
        if (findSym) {
            md.enumerateSymbols().filter((sym: ModuleSymbolDetails) => sym.name.includes(exportName)).forEach((sym: ModuleSymbolDetails) => checkAndShow(sym, callback))
        } else {
            md.enumerateExports().forEach((exp: ModuleExportDetails) => checkAndShow(exp, callback))
        }
    }

    if (callback == showDetails) LOGN(`\n[=] ${count} result(s)\n`)
    else return

    function checkAndShow(exp: ModuleExportDetails | ModuleSymbolDetails, callback?: (exp: ModuleExportDetails | ModuleSymbolDetails, demangleName?: string) => void) {
        let name = exp.name
        if (checkDemangleName) {
            // 这会遍历太多的函数名 并且调用 demangle 会消耗大量时间，不建议使用
            let demangledName = demangleName(name)
            demangledName = (demangledName == "" ? name : demangledName)!
            if (name.indexOf(exportName) != -1 || demangledName.indexOf(exportName) != -1) callback!(exp, demangledName)
        } else {
            if (name.indexOf(exportName) != -1) {
                let demangledName = demangleName(name)
                demangledName = (demangledName == "" ? name : demangledName)!
                callback!(exp, demangledName)
            }
        }
    }

    function showDetails(exp: ModuleExportDetails | ModuleSymbolDetails, demangleName?: string) {
        try {
            let md: Module = Process.findModuleByAddress(exp.address)!
            if (md == null) {
                let mdt: Module = Process.findModuleByName(Process.arch == 'arm' ? 'linker' : 'linker64')!
                mdt.enumerateExports().forEach((linkerExp: ModuleExportDetails) => {
                    if (linkerExp.address.equals(exp.address) && linkerExp.name == exp.name) md = mdt
                })
            }
            let rg: RangeDetails = Process.findRangeByAddress(exp.address)!
            let dmn = demangleName!
            let desp_first_line = `\n[*] ${exp.type} -> address: ${exp.address} ( ${exp.address.sub(md.base)} )  ${exp.name}`
            let desp_first_line_len = desp_first_line.length
            LOGD(desp_first_line)
            let paddedDmn = dmn.padStart(desp_first_line_len - exp.name.length + dmn.length - 1, " ")
            if (dmn.length != 0) LOGO(`${paddedDmn}`)
            LOGZ(`\t[-] MD_Base: ${md.base} | size: ${ptr(md.size).toString().padEnd(p_size * 2, " ")} <-  module:  ${md.name}`)
            LOGZ(`\t[-] RG_Base: ${rg.base} | size: ${ptr(rg.size).toString().padEnd(p_size * 2, " ")} <-  range:   ${rg.protection}`)
            ++count
        } catch (error) {
            if (!findSym) {
                if (Process.findModuleByAddress(exp.address) == null) LOGE("Module not found")
                if (Process.findRangeByAddress(exp.address) == null) LOGE("Range not found")
            }
            LOGD(JSON.stringify(exp))
        }
    }
}

/**
 * Demangles a C++ symbol name using available libraries.
 * @param expName The mangled symbol name to demangle.
 * @returns The demangled symbol name, or an empty string if demangling failed.
 */
export function demangleName(expName: string) {
    let demangleAddress: NativePointer | null = Module.findExportByName("libc++.so", '__cxa_demangle')
    if (demangleAddress == null) demangleAddress = Module.findExportByName("libunwindstack.so", '__cxa_demangle')
    if (demangleAddress == null) demangleAddress = Module.findExportByName("libbacktrace.so", '__cxa_demangle')
    if (demangleAddress == null) demangleAddress = Module.findExportByName(null, '__cxa_demangle')
    if (demangleAddress == null) throw Error("can not find export function -> __cxa_demangle")
    let demangle: Function = new NativeFunction(demangleAddress, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
    let mangledName: NativePointer = Memory.allocUtf8String(expName)
    let outputBuffer: NativePointer = NULL
    let length: NativePointer = NULL
    let status: NativePointer = Memory.alloc(Process.pageSize)
    let result: NativePointer = demangle(mangledName, outputBuffer, length, status) as NativePointer
    if (status.readInt() === 0) {
        let resultStr: string | null = result.readUtf8String()
        return (resultStr == null || resultStr == expName) ? "" : resultStr
    } else return ""
}

globalThis.demangleName = demangleName

globalThis.packApiResove = (patter: string = "exports:*!*Unwind*"): void => {
    let index: number = 0
    new ApiResolver("module").enumerateMatches(patter).forEach((exp) => {
        LOGD(`${PD(`[${++index}]`, 5)}${exp.name} ${exp.address}`)
        LOGZ(`\t${demangleName(exp.name.split("!")[1])}`)
    })
}

/**
 * 查找导入表
 * @param {string} moduleName 
 * @param {string} importName 
 * @returns 
 */
globalThis.findImport = (moduleName: string = "libc.so", importName: string = "") => {
    let md = Process.findModuleByName(moduleName)
    if (md == null) {
        LOGE("NOT FOUND Module : " + moduleName)
        return
    }
    md.enumerateImports().forEach((imp: ModuleImportDetails) => {
        if (!imp.name.includes(importName)) return
        let subAddr = (imp == undefined || imp!.address == null) ? "" : ` ( ${imp!.address!.sub(Process.findModuleByAddress(imp!.address)!.base)} )`
        LOGD(`\n[*] ${imp.type} -> address: ${imp.address}${subAddr}  | name: ${imp.name}`)
        let impMdBase = Process.findModuleByName(imp!.module!)?.base
        LOGZ(`\t${imp.module == undefined ? "" : (imp.module + " ( " + impMdBase + " ) ")} \t ${imp.slot == undefined ? "" : imp.slot}`)
    })
    newLine()
}

/**
 * 获取文件长度
 * @param filePath 文件路径
 * @returns 
 */
const getFileLenth = (filePath: string): number => {
    let file = callFunctionWithOutError(Module.findExportByName("libc.so", "fopen")!, allocCStr(filePath), allocCStr("rwx"))
    if (file.isNull()) return 0
    callFunctionWithOutError(Module.findExportByName("libc.so", "fseek")!, file, 0, 2)
    let len = callFunctionRI(Module.findExportByName("libc.so", "ftell")!, file)
    callFunctionWithOutError(Module.findExportByName("libc.so", "fclose")!, file)
    return len
}

globalThis.StalkerTraceEvent = (mPtr: NativePointer, range: NativePointer[] | undefined) => {
    let src_mPtr = mPtr
    mPtr = checkPointer(mPtr)
    if (mPtr == undefined || mPtr.isNull()) return
    const moduleG: Module | null = Process.findModuleByAddress(mPtr)
    if (moduleG == null) {
        LOGE(`Module not found { from ${mPtr}}`)
        return
    }
    if (range != undefined && range.length > 0) {
        for (let i = 0; i < range.length; i++) {
            range[i] = checkPointer(range[i])
        }
    }
    A(mPtr, (args: NativePointer[], _ctx: CpuContext, passValue: Map<PassType, any>) => {
        newLine()
        passValue.set("len", FM.printTitileA(`Enter ---> arg0:${args[0]}  arg1:${args[1]}  arg2:${args[2]}  arg3:${args[3]} | ${Process.getCurrentThreadId()}`, LogColor.YELLOW))
        stalkerEnter(Process.getCurrentThreadId())
    }, (ret: NativePointer, _ctx: CpuContext, passValue: Map<PassType, any>) => {
        LOGW(`${getLine(20)}\n Exit ---> ret : ${ret}\n${getLine(passValue.get("len"))}`)
        stalkerExit(Process.getCurrentThreadId())
    })
    LOGD(`Stalker Attached : ${mPtr} ( ${ptr(src_mPtr as unknown as number)} ) from ${moduleG.name} | ${Process.getCurrentThreadId()}`)

    function stalkerEnter(tid: ThreadId) {
        Stalker.follow(tid, {
            events: {
                call: true,
                ret: false,
                exec: false,
                block: false,
                compile: false
            },
            onReceive: function (events) {
                let msg: StalkerCallEventFull[] = Stalker.parse(events, {
                    annotate: true,     // 标注事件类型
                    stringify: false    // NativePointer 换为字符串
                }) as StalkerCallEventFull[]

                msg.forEach((event: StalkerCallEventFull) => {
                    let md1 = Process.findModuleByAddress(event[1] as NativePointer)
                    let md2 = Process.findModuleByAddress(event[2] as NativePointer)
                    let method_1 = AddressToMethodNoException(event[1] as NativePointer)
                    let method_2 = AddressToMethodNoException(event[2] as NativePointer)
                    if (method_1 != null) LOGW(`${method_1.name}`)
                    if (method_2 != null) LOGW(`${method_2.name}`)
                    LOGD(`${event[0]} Times:${event[3]} ${event[1]}@${md1?.name} ${event[2]}@${md2?.name} `)
                })
            }
        })
    }

    function stalkerExit(_tid: ThreadId) {
        Stalker.unfollow()
        Stalker.garbageCollect()
    }
}

/**
 * exp: StalkerTracePath(0x4CA23C,[0x4CA23C,0x4CA308])
 * @param {NativePointer} mPtr 
 * @param {NativePointer[] | undefined} range 
 * @returns 
 */
globalThis.StalkerTracePath = (mPtr: NativePointer, range: NativePointer[] | undefined) => {
    let src_mPtr: NativePointer = mPtr
    mPtr = checkPointer(mPtr)
    if (mPtr == undefined || mPtr.isNull()) return
    const moduleG: Module | null = Process.findModuleByAddress(mPtr)
    if (moduleG == null) {
        LOGE(`Module not found { from ${mPtr}}`)
        return
    }
    if (range != undefined && range.length > 0) {
        for (let i = 0; i < range.length; i++) {
            range[i] = checkPointer(range[i])
        }
    }
    A(mPtr, (args: NativePointer[], _ctx: CpuContext, passValue: Map<PassType, any>) => {
        newLine()
        passValue.set("len", FM.printTitileA(`Enter ---> arg0:${args[0]}  arg1:${args[1]}  arg2:${args[2]}  arg3:${args[3]} | ${Process.getCurrentThreadId()}`, LogColor.YELLOW))
        stalkerEnter(Process.getCurrentThreadId())
    }, (ret: NativePointer, _ctx: CpuContext, passValue: Map<PassType, any>) => {
        LOGW(`${getLine(20)}\n Exit ---> ret : ${ret}\n${getLine(passValue.get("len"))}`)
        stalkerExit(Process.getCurrentThreadId())
    })
    LOGD(`Stalker Attached : ${mPtr} ( ${ptr(src_mPtr as unknown as number)} ) from ${moduleG.name} | ${Process.getCurrentThreadId()}`)

    function stalkerEnter(tid: ThreadId) {
        let moduleMap = new ModuleMap((module) => {
            if (module.base.equals(moduleG!.base)) return true
            Stalker.exclude(module)
            return false
        })

        Stalker.follow(tid, {
            transform: (iterator: any | StalkerArmIterator | StalkerThumbIterator | StalkerArm64Iterator) => {
                let instruction = iterator.next()
                let isModuleCode = moduleMap.has(instruction.address)
                let subAddress = ptr(instruction.address)
                if (range != undefined) {
                    if (subAddress > range[0] && range[1] > subAddress)
                        LOGD(`[*] ${instruction.address} ( ${subAddress.sub(moduleG!.base)} ) ---> ${instruction.mnemonic} ${instruction.opStr}`)
                } else if (isModuleCode) {
                    LOGD(`[*] ${instruction.address} ( ${subAddress.sub(moduleG!.base)} ) ---> ${instruction.mnemonic} ${instruction.opStr}`)
                }
                do {
                    iterator.keep()
                } while (iterator.next() !== null)
            }
        })
    }

    function stalkerExit(tid: ThreadId) {
        Stalker.unfollow()
        Stalker.garbageCollect()
        LOGE("Stalker Exit : " + Process.getCurrentThreadId())
    }
}

///////// ↓ 测试代码 不用管 ↓ /////////

globalThis.cmdouleTest = () => {

    Interceptor.attach(ptr(0xa8280614), new CModule(`
    #include <gum/guminterceptor.h>

    void onEnter(GumInvocationContext *ctx) {
        g_print("onEnter\n");
    }

    `) as NativeInvocationListenerCallbacks)

    // function logcat(message) {
    //     let logcatF = new NativeFunction(Module.findExportByName("liblog.so", "__android_log_print"), 'void', ['int', 'pointer', 'pointer', 'pointer'])
    //     logcatF(4, Memory.allocUtf8String("ZZZ"), Memory.allocUtf8String("%s"), Memory.allocUtf8String(message))
    //     console.log(message)
    // }

    // logcat("START HOOK -> " + Module.findBaseAddress("libil2cpp.so").add(0xc75f78))

    // Interceptor.attach(Module.findBaseAddress("libil2cpp.so").add(0xc75f78), new CModule(`
    //     #include <gum/guminterceptor.h>

    //     extern void onEnterJS(GumCpuContext *ctx, void* value);

    //     void onEnter(GumInvocationContext *ctx) {
    //         onEnterJS(ctx->cpu_context, gum_invocation_context_get_nth_argument(ctx,1));
    //     }

    // `, {
    //     onEnterJS: new NativeCallback((ctx,value) => {
    //         let message = `OnEnter : ${ctx} ${value}`
    //         logcat(message)
    //     }, 'void', ['pointer'])
    // }))

}

function Arm64WriterUsingExample() {
    // mycode.add(0x4).writeU32(0xD10943FF)//SUB SP ,SP ,#0x250
    // mycode.add(0x8).writeU32(0xA90077E8)//STP X8,X29,[SP]
    // mycode.add(0xc).writeU32(0xA90107E0)//STP X0 ,X1 ,[SP,#0x10]

    let writer = new Arm64Writer(ptr(123))
    writer.putSubRegRegImm('sp', 'sp', 0x250)
    // type Arm64IndexMode = "post-adjust" | "signed-offset" | "pre-adjust";
    writer.putStpRegRegRegOffset('x8', 'x29', 'sp', 0, "post-adjust")
    writer.putStpRegRegRegOffset('x0', 'x1', 'sp', 0x10, "post-adjust")
    // mycode.add(0x10).writeU32(0xA9020FE2)//STP X2,X3,[SP,#0x20]
    // mycode.add(0x14).writeU32(0x58000760)//LDR X0 , [mycode,#0x100]
    // mycode.add(0x18).writeU32(0x58000781)//LDR X1 , [mycode,#0x108]
    writer.putStpRegRegRegOffset('x2', 'x3', 'sp', 0x20, "post-adjust")
    writer.putLdrRegRegOffset('x0', 'x0', 0x100)
    writer.putLdrRegRegOffset('x1', 'x0', 0x108)
    // mycode.add(0x1C).writeU32(0x580007A2)//LDR X2 , [mycode,#0x110]
    // mycode.add(0x20).writeU32(0x580007C3)//LDR X3 , [mycode,#0x118]
    // mycode.add(0x24).writeU32(0xD63F0060)//BLR X3
    writer.putLdrRegRegOffset('x2', 'x0', 0x110)
    writer.putLdrRegRegOffset('x3', 'x0', 0x118)
    writer.putBlrReg('x3')
    // mycode.add(0x28).writeU32(0xA9420FE2)//LDP X2, X3,[SP,#0x20]
    // mycode.add(0x2C).writeU32(0xA94107E0)//LDP X0, X1,[SP,#0x10]
    // mycode.add(0x30).writeU32(0xA94077E8)//LDP X8, X29,[SP]
    writer.putLdpRegRegRegOffset('x2', 'x3', 'sp', 0x20, "post-adjust")
    writer.putLdpRegRegRegOffset('x0', 'x1', 'sp', 0x10, "post-adjust")
    writer.putLdpRegRegRegOffset('x8', 'x29', 'sp', 0, "post-adjust")
    // mycode.add(0x34).writeU32(0x910943FF)//ADD SP, SP, #0x250
    // mycode.add(0x38).writeU32(0x5800075E)//LDR X30, [mycode,#0x120]
    // mycode.add(0x3C).writeU32(0xD65F03C0)//RET
    writer.putAddRegRegImm('sp', 'sp', 0x250)
    writer.putLdrRegRegOffset('x30', 'x0', 0x120)
    writer.putRet()

    writer.flush()

    Memory.patchCode(ptr(123), 0x40, (code: NativePointer) => {
        LOGD(code)
        let writer = new Arm64Writer(code)
        writer.putLabel('start')
        writer.putNop()
        writer.putCallAddressWithArguments(Module.findExportByName("libil2cpp.so", "il2cpp_string_new")!, ['x0', 0x10])
        LOGD(writer.base + " " + writer.pc + " " + writer.offset + " " + writer.code)
        writer.putBlrReg('lr')
        writer.putBCondLabel("eq", 'start')
        writer.flush()
    })
}

globalThis.patchTest = (mPtr: NativePointer, size: number = 1) => {
    Memory.patchCode(checkPointer(mPtr), Process.pageSize * size, (code: NativePointer) => {
        LOGD(code)
        let writer = new ArmWriter(code)
        writer.putLabel('start')
        writer.putNop()
        writer.putCallAddressWithArguments(Module.findExportByName("libil2cpp.so", "il2cpp_string_new")!, ['r10', 0x10])
        LOGD(writer.base + " " + writer.pc + " " + writer.offset + " " + writer.code)
        writer.putBlxReg('lr')
        writer.putBCondLabel("eq", 'start')
        writer.flush()
    })
}

// globalThis.registerClassTest = () => {
//     Java.perform(function () {
//         // 1. 获取原始的 MaxUnityAdManager 类
//         var MaxUnityAdManager = Java.use("com.applovin.mediation.unity.MaxUnityAdManager");
//         // "com.mp.jc.JCWrapperAction"
//         var JCWrapperAction = Java.use("com.mp.jc.JCWrapperAction");

//         // 2. 使用 Java.registerClass 创建一个新类来实现 JCWrapperAction 接口
//         var OurJCWrapperAction = Java.registerClass({
//             name: "com.assistant.OurJCWrapperAction",
//             implements: [JCWrapperAction],
//             methods: {
//                 callback: function (isSuccess) {
//                     // 你可以在这里执行自己的代码
//                     console.log("Our callback: isSuccess:", isSuccess);

//                     var str3 = MaxUnityAdManager.TAG.value;
//                     console.log(str3, "callback: isSuccess:", isSuccess);

//                     if (isSuccess) {
//                         MaxUnityAdManager.onUserRewarded.call(MaxUnityAdManager, maxAd, null); // 使用 call 调用以确保正确的上下文
//                     }
//                     MaxUnityAdManager.onAdHidden.call(MaxUnityAdManager, maxAd);
//                 }
//             }
//         });

//         // 3. Hook JCWrapper.showRewardVideo 方法以使用我们的实现替代原始实现
//         var JCWrapper = Java.use("com.mp.jc.JCWrapper");
//         JCWrapper.showRewardVideo.implementation = function (action) {
//             console.log("showRewardVideo intercepted");
//             // 使用我们的新类替代原始的action
//             var ourAction = OurJCWrapperAction.$new();
//             this.showRewardVideo.call(this, ourAction);
//         };
//     });

// }