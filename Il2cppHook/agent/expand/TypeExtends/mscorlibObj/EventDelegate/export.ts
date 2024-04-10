export const B_Execute = ()=>{

    // EventDelegate

    // 0x765c20128c libil2cpp.so!0x135128c     | MI:0x75d06b3100 -> EventDelegate::public static Void Execute(System.Collections.Generic.List<EventDelegate> list) 0x9c↓
    // 0x765c15f4b4 libil2cpp.so!0x12af4b4     | MI:0x7621d0b490 -> UIPopupList::protected Void TriggerCallbacks() 0xf4↓
    // 0x765c15ebf8 libil2cpp.so!0x12aebf8     | MI:0x7621d0b228 -> UIPopupList::public Void Set(String value, Boolean notify) 0x50↓
    // 0x765c160788 libil2cpp.so!0x12b0788     | MI:0x7621d0b7a8 -> UIPopupList::protected virtual Void OnItemClick(GameObject go) 0xf8↓
    // 0x765c0291d0 libil2cpp.so!0x11791d0     | null
    // 0x765c02911c libil2cpp.so!0x117911c     | null

    // [-]Assembly-CSharp @ 0x7620472728
    // [-]Assembly-CSharp.dll @ 0x76202701a8 | C:638
    //   [-]EventDelegate @ 0x7621c2f9f0 | M:31 | F:11
    //     [-]public Boolean Execute() @ MI: 0x75d06b2ff8 & MP: 0x765c204528 & RP: 0x1354528
    //       [-]_RET_               | type: 0x765da31378 | @ class:0x7620239f70 | System.Boolean
    const class_EventDelegate = Il2Cpp.Domain.assembly("Assembly-CSharp").image.class("EventDelegate")
    const method_Execute = class_EventDelegate.method("Execute", 0)
    Interceptor.attach(method_Execute.virtualAddress, {
        onEnter: function (args: NativePointer[]) {
            this.instance = args[0]
        },
        onLeave: function (retval: InvocationReturnValue) {
            LOGW(`called EventDelegate.Execute( ${new Il2Cpp.Object(this.instance)} @ ${this.instance} ) | ret => ${retval}`)
            PrintStackTraceNative(this.context)
        }
    })

}

declare global {
    var B_Execute: () => void
}

globalThis.B_Execute = B_Execute