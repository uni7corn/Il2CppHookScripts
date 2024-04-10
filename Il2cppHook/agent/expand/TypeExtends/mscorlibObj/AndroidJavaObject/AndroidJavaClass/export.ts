
const classMap = new Map<string, Il2Cpp.AndroidJavaClass>()

// 用不了 ... AndroidJavaClass 会被销毁
// Il2Cpp.perform(() => {
//     recordClasses()
// })
// 
// const recordClasses = () => {
//     try {
//         if (Il2Cpp.Api.AndroidJavaClass.__ctor == undefined) return
//         // UnityEngine.AndroidJavaClass | private Void _AndroidJavaClass(String className)
//         A(Il2Cpp.Api.AndroidJavaClass.__ctor, (args, _ctx) => {
//             classMap.set(readU16(args[1]), new Il2Cpp.AndroidJavaClass(args[0]))
//         })
//     } catch (error) {
//         // LOGE(error)   
//     }
// }

// export const getAndroidClassNameFromHandle = (handle: NativePointer) => {
//     for (let [name, clazz] of classMap) {
//         if (clazz.handle.equals(handle)) {
//             return name
//         }
//     }
//     return "Unknown"
// }

// export const getAndroidClassFromName = (name: string) => classMap.get(name)

declare global {
    var listAndroidClass: () => void
    var B_AndroidJavaClass :()=> void
}

globalThis.listAndroidClass = () => {
    if (classMap.size == 0) throw new Error('Empty Map')
    LOGD(`[+] listAndroidClass ( count:${classMap.size} ) ↓ `)
    for (let [name, clazz] of classMap) {
        LOGD(`\t[-] ${clazz.handle} -> ${name}`)
    }
}

// useage -> fat xxx -f B_AndroidJavaClass()
globalThis.B_AndroidJavaClass = ()=>{
    Il2Cpp.perform(()=>{
        const method = Il2Cpp.Domain
            .assembly("UnityEngine.AndroidJNIModule")
            .image
            .class("UnityEngine.AndroidJavaClass")
            .method(".ctor", 1)
            .overload("System.String")
        b(method)
    })
}

export {} 