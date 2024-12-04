var semlock = Memory.alloc(0x10)

export const sem_wait = () => {
    const func_sem_init = new NativeFunction(Module.findExportByName("libc.so", "sem_init")!, "int", ["pointer", "int", "uint"])
    func_sem_init(semlock, 0, 0)
    const func_sem_wait = new NativeFunction(Module.findExportByName("libc.so", "sem_wait")!, "int", ["pointer"])
    func_sem_wait(semlock)
}

export const sem_post = () => {
    new NativeFunction(Module.findExportByName("libc.so", "sem_post")!, "int", ["pointer"])(semlock)
    const func_sem_destroy = new NativeFunction(Module.findExportByName("libc.so", "sem_destroy")!, "int", ["pointer"])
    func_sem_destroy(semlock)
}

declare global {
    var g_sem_lock: NativePointer
    var sem_wait: () => void
    var sem_post: () => void
}

globalThis.g_sem_lock = semlock
globalThis.sem_wait = sem_wait
globalThis.sem_post = sem_post

export class PauseHelper {

    private static savedPauseCode: NativePointer = ptr(0)

    public static Pause() {
        Il2Cpp.perform(() => {
            Memory.patchCode(PauseHelper.getPauseAddress(), 0x4, (code: NativePointer) => {
                PauseHelper.savedPauseCode = code.readPointer()
                var writer: ArmWriter | Arm64Writer
                writer = Process.arch == "arm64" ? new Arm64Writer(code) : new ArmWriter(code)
                writer.putLabel("loop")
                writer.putBLabel("loop")
                writer.flush()
            })
        })
    }

    public static Resume() {
        Il2Cpp.perform(() => {
            Memory.patchCode(PauseHelper.getPauseAddress(), 0x4, (code: NativePointer) => {
                code.writePointer(PauseHelper.savedPauseCode)
            })
        })
    }

    public static getPauseAddress = () => {
        let EventSystem = Il2Cpp.Domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.EventSystems.EventSystem")
        if (EventSystem != null) {
            let method = EventSystem.tryMethod("Update")
            if (method != null) return method.virtualAddress
        }
        let Image = Il2Cpp.Domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.UI.Image")
        if (Image != null) {
            let method = Image.tryMethod("UpdateMaterial")
            if (method != null) return method.virtualAddress
        }
        return Il2Cpp.Api.GameObject._SetActive
    }
}

declare global{
    // you can use pause() to pause the game and resume() to resume the game
    var pause: () => void
    var resume: () => void
}

globalThis.pause = PauseHelper.Pause
globalThis.resume = PauseHelper.Resume