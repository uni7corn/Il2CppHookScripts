/**
 * list mem so
 * @param filter filter path or so name
 */
function listSo(filter?: string) {
    let mds = Process.enumerateModules()
    if (filter != undefined && filter.length != 0) 
        mds = mds.filter((md) => {return md.name.includes(filter) || md.path.includes(filter)})
    newLine()
    mds.forEach((md,index) => {
        LOGD(`[ ${index} ] ${md.base} - ${md.base.add(md.size)} ${md.name}`)
        LOGZ(`\t${ptr(md.size)} | ${md.path}`)
    })
    if (filter != undefined && filter.length != 0) 
        LOGW(`Total: ${mds.length}`)
}

/**
 * 内存 dump so
 * @param soName 指定so名称
 */
function dump_so(soName: string = "libil2cpp.so") {
    const module = Process.getModuleByName(soName)
    LOGE(getLine(30))
    LOGW("[name]:" + module.name)
    LOGW("[base]:" + module.base)
    LOGW("[size]:" + module.size)
    LOGW("[path]:" + module.path)
    LOGE(getLine(30))
    const fileName = `${module.name}_${module.base}_${ptr(module.size)}.so`
    dump_mem(module.base, module.size, fileName)
}

/**
 * 内存 dump
 * @param from 从哪里开始
 * @param length 长度
 * @param fileName 保存的文件名
 * @returns 
 */
function dump_mem(from: NativePointer, length: number, fileName: string | undefined) {
    from = checkCmdInput(from)
    if (length <= 0) return

    // 获取dump文件路径
    let savedPath: string = ''
    Java.perform(function () {
        let currentApplication = Java.use("android.app.ActivityThread").currentApplication()
        savedPath = currentApplication.getApplicationContext().getFilesDir().getPath()
    })
    // 拼接文件名
    if (fileName == undefined) {
        savedPath += `/${from}_${length}.bin`
    } else {
        savedPath += fileName
    }
    // dump
    const file_handle = new File(savedPath, "wb")
    if (file_handle && file_handle != null) {
        Memory.protect(from, length, 'rwx')
        let libso_buffer = from.readByteArray(length)!
        file_handle.write(libso_buffer)
        file_handle.flush()
        file_handle.close()
        LOGZ(`\nDump ${length} bytes from ${from} to ${from.add(length)}`)
        LOGD(`Saved to -> ${savedPath}\n`)
    }
}

declare global {
    var listSo: (filter?: string) => void
    var dumpSo: (soName: string) => void
    var dumpMem: (from: NativePointer, length: number, fileName: string | undefined) => void
}

globalThis.listSo = listSo
globalThis.dumpSo = dump_so
globalThis.dumpMem = dump_mem

export { }