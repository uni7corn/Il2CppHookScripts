import { cache } from "decorator-cache-getter"

class _EventDelegate_API {
        // public MonoBehaviour get_target()
        @cache
        static get _get_target() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "get_target", 0, [], "pointer", ["pointer"])
        }

        // public Void set_target(MonoBehaviour value)
        @cache
        static get _set_target() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "set_target", 1, ["UnityEngine.MonoBehaviour"], "void", ["pointer","pointer"])
        }

        // public String get_methodName()
        @cache
        static get _get_methodName() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "get_methodName", 0, [], "pointer", ["pointer"])
        }

        // public Void set_methodName(String value)
        @cache
        static get _set_methodName() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "set_methodName", 1, ["System.String"], "void", ["pointer","pointer"])
        }

        // public Parameter[] get_parameters()
        @cache
        static get _get_parameters() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "get_parameters", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isValid()
        @cache
        static get _get_isValid() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "get_isValid", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isEnabled()
        @cache
        static get _get_isEnabled() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "get_isEnabled", 0, [], "pointer", ["pointer"])
        }

        // public Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", ".ctor", 0, [], "void", ["pointer"])
        }

        // public Void .ctor(Callback call)
        @cache
        static get __ctor_call() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", ".ctor", 1, ["EventDelegate.Callback"], "void", ["pointer","pointer"])
        }

        // public Void .ctor(MonoBehaviour target, String methodName)
        @cache
        static get __ctor_target_methodName() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", ".ctor", 2, ["UnityEngine.MonoBehaviour","System.String"], "void", ["pointer","pointer","pointer"])
        }

        // private static String GetMethodName(Callback callback)
        @cache
        static get _GetMethodName() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "GetMethodName", 1, ["EventDelegate.Callback"], "pointer", ["pointer"])
        }

        // private static Boolean IsValid(Callback callback)
        @cache
        static get _IsValid() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "IsValid", 1, ["EventDelegate.Callback"], "pointer", ["pointer"])
        }

        // public override Boolean Equals(Object obj)
        @cache
        static get _Equals() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Equals", 1, ["System.Object"], "pointer", ["pointer","pointer"])
        }

        // public override Int32 GetHashCode()
        @cache
        static get _GetHashCode() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "GetHashCode", 0, [], "pointer", ["pointer"])
        }

        // private Void Set(Callback call)
        @cache
        static get _Set() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Set", 1, ["EventDelegate.Callback"], "void", ["pointer","pointer"])
        }

        // public Void Set(MonoBehaviour target, String methodName)
        @cache
        static get _Set_target_methodName() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Set", 2, ["UnityEngine.MonoBehaviour","System.String"], "void", ["pointer","pointer","pointer"])
        }

        // private Void Cache()
        @cache
        static get _Cache() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Cache", 0, [], "void", ["pointer"])
        }

        // public Boolean Execute()
        @cache
        static get _Execute() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Execute", 0, [], "pointer", ["pointer"])
        }

        // public Void Clear()
        @cache
        static get _Clear() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Clear", 0, [], "void", ["pointer"])
        }

        // public override String ToString()
        @cache
        static get _ToString() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "ToString", 0, [], "pointer", ["pointer"])
        }

        // public static Void Execute(System.Collections.Generic.List<EventDelegate> list)
        @cache
        static get _Execute_list() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Execute", 1, ["System.Collections.Generic.List<EventDelegate>"], "void", ["pointer"])
        }

        // public static Boolean IsValid(System.Collections.Generic.List<EventDelegate> list)
        @cache
        static get _IsValid_list() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "IsValid", 1, ["System.Collections.Generic.List<EventDelegate>"], "pointer", ["pointer"])
        }

        // public static EventDelegate Set(System.Collections.Generic.List<EventDelegate> list, Callback callback)
        @cache
        static get _Set_list_callback() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Set", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate.Callback"], "pointer", ["pointer","pointer"])
        }

        // public static Void Set(System.Collections.Generic.List<EventDelegate> list, EventDelegate del)
        @cache
        static get _Set_list_del() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Set", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate"], "void", ["pointer","pointer"])
        }

        // public static EventDelegate Add(System.Collections.Generic.List<EventDelegate> list, Callback callback)
        @cache
        static get _Add() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Add", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate.Callback"], "pointer", ["pointer","pointer"])
        }

        // public static EventDelegate Add(System.Collections.Generic.List<EventDelegate> list, Callback callback, Boolean oneShot)
        @cache
        static get _Add_list_callback_oneShot() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Add", 3, ["System.Collections.Generic.List<EventDelegate>","EventDelegate.Callback","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // public static Void Add(System.Collections.Generic.List<EventDelegate> list, EventDelegate ev)
        @cache
        static get _Add_list_ev() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Add", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate"], "void", ["pointer","pointer"])
        }

        // public static Void Add(System.Collections.Generic.List<EventDelegate> list, EventDelegate ev, Boolean oneShot)
        @cache
        static get _Add_list_ev_oneShot() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Add", 3, ["System.Collections.Generic.List<EventDelegate>","EventDelegate","System.Boolean"], "void", ["pointer","pointer","pointer"])
        }

        // public static Boolean Remove(System.Collections.Generic.List<EventDelegate> list, Callback callback)
        @cache
        static get _Remove() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Remove", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate.Callback"], "pointer", ["pointer","pointer"])
        }

        // public static Boolean Remove(System.Collections.Generic.List<EventDelegate> list, EventDelegate ev)
        @cache
        static get _Remove_list_ev() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", "Remove", 2, ["System.Collections.Generic.List<EventDelegate>","EventDelegate"], "pointer", ["pointer","pointer"])
        }

        // private static Void .cctor()
        @cache
        static get __cctor() {
                return Il2Cpp.Api.o("Assembly-CSharp", "EventDelegate", ".cctor", 0, [], "void", [])
        }

}

Il2Cpp.Api.EventDelegate = _EventDelegate_API

declare global {
        namespace Il2Cpp.Api{
                class EventDelegate extends _EventDelegate_API { }
        }
}

export { }