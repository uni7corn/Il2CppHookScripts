export const getEventUpdate = <T>(needMethod: boolean = false): T => {
    // [-]UnityEngine.UI @ 0x760025f750
    //   [-]UnityEngine.UI.dll @ 0x760025d520 | C:205
    //   [-]EventSystem @ 0x7601b39ec0 | M:38 | F:14 | N:UnityEngine.EventSystems
    //     [-]protected virtual Void Update() @ MI: 0x7601b18b40 & MP: 0x762f7aacd0 & RP: 0x42e5cd0
    const local_method: Il2Cpp.Method = Il2Cpp.Domain.assembly("UnityEngine.UI").image.class("UnityEngine.EventSystems.EventSystem").method("Update")
    if (needMethod == undefined || needMethod == null || needMethod == false) {
        return local_method.virtualAddress as unknown as T
    } else {
        return local_method as unknown as T
    }
}

// UnityEngine.UI.UnityEngine.EventSystems.EventSystem.get_current 0
export const getEventSystem = (): Il2Cpp.EventSystem => Il2Cpp.EventSystem.get_current

export const event_getcurrent_select_gameobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_currentSelectedGameObject()
    if (gObj == null) LOGE(`Noting to show ...`)
    if (gObj != null) showGameObject(gObj)
}

export const event_get_firstSelectGobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_firstSelectedGameObject()
    if (gObj != null) showGameObject(gObj)
}

export const event_get_lastSelectGobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_lastSelectedGameObject()
    if (gObj != null) showGameObject(gObj)
}

declare global {
    var getEventUpdate: <T>(needMethod?: boolean) => T
    var showCurrentEventGobj: () => void
    var showFirstEventGobj: () => void
    var showLastEventGobj: () => void
}

globalThis.getEventUpdate = getEventUpdate
globalThis.showCurrentEventGobj = event_getcurrent_select_gameobj
globalThis.showFirstEventGobj = event_get_firstSelectGobj
globalThis.showLastEventGobj = event_get_lastSelectGobj