import { GKEY, LogColor } from "../base/enum"
import { GET_GT, SET_G } from "../base/globle"
import { formartClass as FM } from "./formart"

export class Logger {

    private static linesMap = new Map()
    private static colorEndDes: string = "\x1b[0m"
    private static colorStartDes = (color: LogColor): string => `\x1b[${color as number}m`

    private static logL = console.log
    public static setNeedLog = (flag: boolean): void => SET_G(GKEY.LogFlag, flag) as unknown as void
    public static getNeedLog = (): boolean => GET_GT<boolean>(GKEY.LogFlag)

    static LOGW = (msg: any): void => LOG(msg, LogColor.YELLOW)
    static LOGE = (msg: any): void => LOG(msg, LogColor.RED)
    static LOGG = (msg: any): void => LOG(msg, LogColor.C32)
    static LOGD = (msg: any): void => LOG(msg, LogColor.C36)
    static LOGN = (msg: any): void => LOG(msg, LogColor.C35)
    static LOGO = (msg: any): void => LOG(msg, LogColor.C33)
    static LOGP = (msg: any): void => LOG(msg, LogColor.C34)
    static LOGM = (msg: any): void => LOG(msg, LogColor.C92)
    static LOGH = (msg: any): void => LOG(msg, LogColor.C96)
    static LOGZ = (msg: any): void => LOG(msg, LogColor.C90)
    static LOGJSON = (obj: any, type: LogColor = LogColor.C36, space: number = 1): void => LOG(JSON.stringify(obj, null, space), type)

    static LOG = (str: any, type: LogColor = LogColor.WHITE): void => {
        switch (type) {
            case LogColor.WHITE: Logger.logL(str); break
            case LogColor.RED: console.error(str); break
            case LogColor.YELLOW: console.warn(str); break
            default: Logger.logL("\x1b[" + type + "m" + str + "\x1b[0m"); break
        }
    }

    // not used
    static LOGS = (str: string, colorDescription: [number, number, LogColor][] = [[0, str.length, LogColor.RED]]) => {
        let localStr = str
        for (let i = 0; i < colorDescription.length; i++) {
            const [start, end, color] = colorDescription[i]
            let strStart = Logger.colorStartDes(color)
            localStr = FM.insertStr(localStr, start, strStart)
            localStr = FM.insertStr(localStr, end + strStart.length, Logger.colorEndDes)
        }
        Logger.logL(localStr)
    }

    static printLogColors = (): void => {
        let str = "123456789"
        Logger.logL(`\n${getLine(16)}  listLogColors  ${getLine(16)}`)
        for (let i = 30; i <= 37; i++) {
            Logger.logL(`\t\t${Logger.colorStartDes(i)} C${i}\t${str} ${Logger.colorEndDes}`)
        }
        Logger.logL(getLine(50))
        for (let i = 40; i <= 47; i++) {
            Logger.logL(`\t\t${Logger.colorStartDes(i)} C${i}\t${str} ${Logger.colorEndDes}`)
        }
        Logger.logL(getLine(50))
        for (let i = 90; i <= 97; i++) {
            Logger.logL(`\t\t${Logger.colorStartDes(i)} C${i}\t${str} ${Logger.colorEndDes}`)
        }
        Logger.logL(getLine(50))
        for (let i = 100; i <= 107; i++) {
            Logger.logL(`\t\t${Logger.colorStartDes(i)} C${i}\t${str} ${Logger.colorEndDes}`)
        }
        Logger.logL(getLine(50))
    }

    // log(chalk.red("this"), chalk.blue("is"), chalk.green("a"), chalk.yellow("test"))
    // chalk.bold chalk.rgb 在 frida 这里不好使
    // static logFormart = (...text: chalk.Chalk[] | string[]) => logL(...text)
    static getLine = (length: number, fillStr: string = "-") => {
        if (length == 0) return ""
        let key = length + "|" + fillStr
        if (Logger.linesMap.get(key) != null) return Logger.linesMap.get(key)
        for (var index = 0, tmpRet = ""; index < length; index++) tmpRet += fillStr
        Logger.linesMap.set(key, tmpRet)
        return tmpRet
    }

    // build a text with color (use LOG to print)
    static getTextFormart = (text: string, color: LogColor = LogColor.WHITE, fillStr: string = " ", length: number = -1, center: boolean = false): string => {
        if (text == undefined) text = ""
        if (length == -1) length = text.length
        let ret = Logger.colorStartDes(color)
        let fillLength = length - text.length
        if (fillLength > 0) {
            let left = Math.floor(fillLength / 2)
            let right = fillLength - left
            if (center) {
                left = right
            }
            ret += getLine(left, fillStr) + text + getLine(right, fillStr)
        } else {
            ret += text
        }
        ret += Logger.colorEndDes
        return ret
    }

    static callOnce<T extends Function>(func: T): T {
        let called = false
        return ((...args: any[]) => {
            if (!called) {
                called = true
                return func(...args)
            }
        }) as unknown as T
    }
}

enum android_LogPriority {
    ANDROID_LOG_UNKNOWN = 0,
    ANDROID_LOG_DEFAULT = 1,
    ANDROID_LOG_VERBOSE = 2,
    ANDROID_LOG_DEBUG = 3,
    ANDROID_LOG_INFO = 4,
    ANDROID_LOG_WARN = 5,
    ANDROID_LOG_ERROR = 6,
    ANDROID_LOG_FATAL = 7,
    ANDROID_LOG_SILENT = 8
}

const LOG_TAG: string = "ZZZ"
const useCModule = false

globalThis.logcat = (msg: string) => {
    Java.perform(function () {
        Java.use("android.util.Log").e("ZZZ", msg)
    })
}

const testMem = Memory.alloc(0x30)
// https://www.freecodecamp.org/news/all-emojis-emoji-list-for-copy-and-paste/#smileyfaceemojis
// 20 F0 9F A4 A9 F0 9F A5 B0 F0 9F A4 96 F0 9F 92 AC F0 9F 92 BC E2 80 BC EF B8 8F 20 54 65 73 74 4D 65 73 73 61 67 65 20 7E
testMem.writeByteArray([0x20, 0xF0, 0x9F, 0xA4, 0xA9, 0xF0, 0x9F, 0xA5, 0xB0, 0xF0, 0x9F, 0xA4, 0x96, 0xF0, 0x9F, 0x92, 0xAC, 0xF0, 0x9F, 0x92, 0xBC, 0xE2, 0x80, 0xBC, 0xEF, 0xB8, 0x8F, 0x20, 0x54, 0x65, 0x73, 0x74, 0x4D, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x20, 0x7E])

globalThis.logcat_native = (fmt: string = "%s", msg: NativePointer = testMem, tag: string = LOG_TAG, priority: android_LogPriority = android_LogPriority.ANDROID_LOG_INFO) => {
    if (!useCModule) {
        const logcat_f = new NativeFunction(Module.findExportByName("liblog.so", "__android_log_print")!
            , 'void', ['int', 'pointer', 'pointer', 'pointer'])
        logcat_f(4, Memory.allocUtf8String(tag), Memory.allocUtf8String(fmt), msg)
    } else {
        var cmd = new CModule(`
        #include <stdio.h>
        extern int __android_log_print(int, const char*, const char*, ...);
        void logcat(const char* fmt, const char* msg){
            __android_log_print(${priority}, "${tag}", fmt, msg);
        }
        `, { __android_log_print: Module.findExportByName("liblog.so", "__android_log_print")! })
        new NativeFunction(cmd["logcat"], 'void', ['pointer'])(msg)
    }
}

globalThis.logcat_test = (fmt: string = "%s", msg: string = "TEST", tag: string = LOG_TAG, priority: android_LogPriority = android_LogPriority.ANDROID_LOG_INFO) => {
    logcat_native(fmt, Memory.allocUtf8String(msg), tag, priority)
}

declare global {
    var LOG: (str: any, type?: LogColor) => void
    // var LOGS: (str: string, colorDescription: [number, number, LogColor][]) => void
    var LOGW: (msg: any) => void // LogColor.YELLOW
    var LOGE: (msg: any) => void // LogColor.RED
    var LOGD: (msg: any) => void // LogColor.C36
    var LOGN: (msg: any) => void // LogColor.C35
    var LOGG: (msg: any) => void // LogColor.C32
    var LOGO: (msg: any) => void // LogColor.C33
    var LOGP: (msg: any) => void // LogColor.C33
    var LOGH: (msg: any) => void // LogColor.C96
    var LOGM: (msg: any) => void // LogColor.C96
    var LOGZ: (msg: any) => void // LogColor.C90
    var LOGJSON: (obj: any, type?: LogColor, lines?: number) => void
    var callOnce: (func: Function) => Function
    var newLine: (lines?: number) => void
    var getLine: (length: number, fillStr?: string) => string
    var printLogColors: () => void
    var TFM: (text: string, color?: LogColor, fillStr?: string, length?: number, center?: boolean) => string
    var LogColor: any
    // var log: (...text: chalk.Chalk[] | string[]) => void

    // android logcat
    var logcat: (msg: string) => void // java
    var logcat_test: (fmt?: string, msg?: string, tag?: string, priority?: android_LogPriority) => void // native test
    var logcat_native: (fmt?: string, msg?: NativePointer, tag?: string, priority?: android_LogPriority) => void // orgin native
}

globalThis.LOG = Logger.LOG
globalThis.LOGW = Logger.LOGW
globalThis.LOGE = Logger.LOGE
globalThis.LOGG = Logger.LOGG
globalThis.LOGD = Logger.LOGD
globalThis.LOGN = Logger.LOGN
globalThis.LOGO = Logger.LOGO
globalThis.LOGP = Logger.LOGP
globalThis.LOGH = Logger.LOGH
globalThis.LOGM = Logger.LOGM
globalThis.LOGZ = Logger.LOGZ
globalThis.LOGJSON = Logger.LOGJSON
globalThis.getLine = Logger.getLine
globalThis.printLogColors = Logger.printLogColors
globalThis.newLine = (lines: number = 1) => Logger.LOG(getLine(lines, "\n"))
globalThis.callOnce = Logger.callOnce
globalThis.TFM = Logger.getTextFormart // 这个本不应该导出的，但是为了代码写的简短一些
globalThis.LogColor = LogColor
// globalThis.log = logFormart // alias log <= logFormart
