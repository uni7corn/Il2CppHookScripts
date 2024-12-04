import { getThreadName } from "../base/extends"

export type pid_t = number
function getpid(): pid_t {
    const getpid = new NativeFunction(Module.findExportByName("libc.so", 'getpid')!, 'int', [])
    return getpid() as pid_t
}

function gettid() {
    const gettid = new NativeFunction(Module.findExportByName("libc.so", 'gettid')!, 'int', [])
    return gettid()
}

export type pthread_t = NativePointerValue
export type pthread_attr_t = NativePointerValue
export const hookThread = () => {

    LOGW(`MAIN Thread ID : ${Process.id}`)

    // ref : https://www.cnblogs.com/revercc/p/18157194
    // ref : http://xrefandroid.com/android-12.0.0_r34/xref/bionic/libc/bionic/pthread_create.cpp#380
    // int pthread_create(pthread_t* __pthread_ptr, pthread_attr_t const* __attr, void* (* __start_routine)(void*), void* __data);
    const addr_pthread_create = Module.findExportByName("libc.so", "pthread_create")!
    const func_pthread_create = new NativeFunction(addr_pthread_create, "int", ["pointer", "pointer", "pointer", "pointer"])
    Interceptor.attach(addr_pthread_create, {
        onEnter: function (args) {
            const __pthread_ptr: pthread_t = args[0]
            this.__pthread_ptr = __pthread_ptr
            const __attr: pthread_attr_t = args[1]
            this.__attr = __attr
            const __start_routine = new NativeFunction(args[2], "pointer", ["pointer"])
            this.__start_routine = __start_routine
            const __debugInfo = __start_routine.isNull() ? 'NULL' : DebugSymbol.fromAddress(__start_routine)
            this.__debugInfo = __debugInfo
            const __data = args[3]
            this.__data = __data
        }, onLeave: function () {
            try {
                const pid: number = getpid()
                let pid_des: string = `${pid}`
                try {
                    pid_des += ` [ ${getThreadName(pid)} ] `
                } catch { }
                const pid_target: number = this.__pthread_ptr.readPointer().add(0x10).readU32()
                let pid_target_des: string = `${pid_target}`
                try {
                    pid_target_des += ` [ ${getThreadName(pid_target)} ] `
                } catch { }
                LOGW(`\ntid : ${pid_des} -> ${pid_target_des}`)
                LOGD(`pthread_create:\n\t__pthread_ptr=${this.__pthread_ptr}\n\t__attr=${this.__attr}\n\t__start_routine=${this.__debugInfo} @ ${this.__start_routine}\n\t__data=${this.__data}`)
                PrintStackTraceNative(this.context)
            } catch (e) {
            }
        }
    })

    // int pthread_setname_np(pthread_t __pthread, const char* _Nonnull __name);
    const addr_pthread_setname_np = Module.findExportByName("libc.so", "pthread_setname_np")!
    const func_pthread_setname_np = new NativeFunction(addr_pthread_setname_np, "int", ["pointer", "pointer"])
    Interceptor.attach(addr_pthread_setname_np, {
        onEnter: function (args) {
            const __pthread = args[0]
            const __name = args[1].readCString()
            LOGD(`pthread_setname_np: __pthread=${__pthread}, __name=${__name}`)
            // PrintStackTraceNative(this.context)
        }
    })

    // void pthread_exit(void* _Nullable __return_value) __noreturn;
    const addr_pthread_exit = Module.findExportByName("libc.so", "pthread_exit")!
    const func_pthread_exit = new NativeFunction(addr_pthread_exit, "void", ["pointer"])
    Interceptor.attach(addr_pthread_exit, {
        onEnter: function (args) {
            const __return_value = args[0]
            LOGD(`pthread_exit: { ${getThreadName()} } | __return_value=${__return_value}`)
            // PrintStackTraceNative(this.context)
        }
    })

    // pid_t  fork(void);
    const addr_fork = Module.findExportByName("libc.so", "fork")!
    const func_fork = new NativeFunction(addr_fork, "int", [])
    Interceptor.attach(addr_fork, {
        onEnter: function (args) {
            LOGE(`fork: { ${getThreadName()} }`)
            PrintStackTraceNative(this.context)
        }
    })

    // pid_t  vfork(void) __returns_twice;
    const addr_vfork = Module.findExportByName("libc.so", "vfork")!
    const func_vfork = new NativeFunction(addr_vfork, "int", [])
    Interceptor.attach(addr_vfork, {
        onEnter: function (args) {
            LOGE(`vfork: { ${getThreadName()} }`)
            PrintStackTraceNative(this.context)
        }
    })

    // int pause(void);
    const addr_pause = Module.findExportByName("libc.so", 'pause')!
    const func_pause = new NativeFunction(addr_pause, 'int', [])
    Interceptor.attach(addr_pause, {
        onEnter: function (args) {
            LOGD(`pause: { ${getThreadName()} }`)
        }
    })

    // int pthread_kill(pthread_t __pthread, int __signal);
    const addr_pthread_kill = Module.findExportByName("libc.so", 'pthread_kill')!
    const func_pthread_kill = new NativeFunction(addr_pthread_kill, 'int', ['pointer', 'int'])
    Interceptor.attach(addr_pthread_kill, {
        onEnter: function (args) {
            const __pthread = args[0]
            const __signal = args[1]
            LOGD(`pthread_kill: __pthread=${__pthread}, __signal=${__signal} { ${getThreadName()} }`)
        }
    })

    // int kill(pid_t __pid, int __signal);
    const addr_kill = Module.findExportByName("libc.so", 'kill')!
    const func_kill = new NativeFunction(addr_kill, 'int', ['pointer', 'int'])
    Interceptor.attach(func_kill, {
        onEnter: function (args) {
            const __pthread = args[0]
            const __signal = args[1]
            LOGD(`func_kill: __pid=${__pthread}, __signal=${__signal} { ${getThreadName()} }`)
        }
    })

    // int pthread_detach(pthread_t __pthread);
    const addr_pthread_detach = Module.findExportByName("libc.so", 'pthread_detach')!
    const func_pthread_detach = new NativeFunction(addr_pthread_detach, 'int', ['pointer'])
    Interceptor.attach(addr_pthread_detach, {
        onEnter: function (args) {
            const __pthread = args[0]
            LOGD(`pthread_detach: __pthread=${__pthread} { ${getThreadName()} }`)
        }
    })

    // int pthread_join(pthread_t __pthread, void** __value_ptr);
    const addr_pthread_join = Module.findExportByName("libc.so", 'pthread_join')!
    const func_pthread_join = new NativeFunction(addr_pthread_join, 'int', ['pointer', 'pointer'])
    Interceptor.attach(addr_pthread_join, {
        onEnter: function (args) {
            const __pthread = args[0]
            const __value_ptr = args[1]
            LOGD(`pthread_join: __pthread=${__pthread}, __value_ptr=${__value_ptr} { ${getThreadName()} }`)
        }
    })
}

declare global {
    var hookThread: () => void
}

globalThis.hookThread = hookThread