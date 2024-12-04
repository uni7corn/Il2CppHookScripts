/**
 * 
 *  IL2CPP FIX
 * 
 *  ERROR : il2cpp: couldn't determine the Unity version, please specify it manually
 *  使用 AssetStudioGUI 确认当前Unity版本后自行修改此处 ↓
 */
function fixMoreVerison() {

    const UnityVersion = "2020.3.0f1c1"

    Il2Cpp.perform(() => {
        if (Il2Cpp.Api._resolveInternalCall(allocCStr('UnityEngine.Application::get_unityVersion')).isNull()) {
            LOGW(`Couldn't determine the Unity version, Schedule set to ${UnityVersion}`)
            setTimeout(() => {
                if (Reflect.has(Il2Cpp, "unityVersion")) {
                    Reflect.deleteProperty(Il2Cpp, "unityVersion")
                    Reflect.defineProperty(Il2Cpp, "unityVersion", { value: UnityVersion })
                }
                if (Reflect.has(Il2Cpp, "unityVersionIsBelow201830")) {
                    Reflect.deleteProperty(Il2Cpp, "unityVersionIsBelow201830")
                    Reflect.defineProperty(Il2Cpp, "unityVersionIsBelow201830", { value: false })
                }
            }, 1000)
        }
    })

    // {
    //     Il2Cpp.perform(() => {
    //         setTimeout(() => {
    //             if (Il2Cpp.Api._resolveInternalCall(allocCStr('UnityEngine.Application::get_unityVersion')).isNull()) {
    //                 A(Il2Cpp.Api._resolveInternalCall, (args: InvocationArguments, _ctx: CpuContext, passValue: Map<PassType, any>) => {
    //                     if (args[0].readCString() == 'UnityEngine.Application::get_unityVersion') {
    //                         passValue.set("RET", allocCStr(UnityVersion))
    //                         LOGE(`Can't get UnityVersion, set to ${UnityVersion}`)
    //                         Reflect.defineProperty(Il2Cpp, "UnityVersion", {
    //                             value: UnityVersion
    //                         })
    //                     }
    //                 }, (ret, _ctx, passValue) => {
    //                     if (passValue.get("RET") != undefined) {
    //                         return new NativeCallback(function () {
    //                             return passValue.get("RET")
    //                         }, 'pointer', [])
    //                     }
    //                     return ret
    //                 })
    //             }
    //         }, 1000)
    //     })
    // }
}

setImmediate(fixMoreVerison)

/**
 * class 能正确解析， 结构体解析参数的时候需要去掉他前面的两个 pointer size
 */
function fixFieldOffset() {
    Reflect.deleteProperty(Il2Cpp.Field, "offset")
    Reflect.set(Il2Cpp.Field, "offset", {
        value: function (field: Il2Cpp.Field) {
            let local_offset = field.offset
            if (local_offset < 0) return -1
            if (Process.arch == "arm") local_offset = field.offset - 8
            if (Process.arch == "arm64") local_offset = field.offset - 16
            return local_offset
        }
    })
    A(Il2Cpp.Api._fieldGetOffset, undefined, (ret) => {
        let local_offset: number = ret.toInt32()
        if (local_offset < 0) return -1
        if (Process.arch == "arm") local_offset = local_offset - 8
        if (Process.arch == "arm64") local_offset = local_offset - 16
        ret.replace(ptr(local_offset))
    })
}