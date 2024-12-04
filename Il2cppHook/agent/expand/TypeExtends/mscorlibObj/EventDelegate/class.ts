import { mscorlib_System_Object_impl as System_Object } from "../class"
import { System_Reflection_RuntimeMethodInfo_Impl as RuntimeMethodInfo} from "../MemberInfo/MethodBase/MethodInfo/RuntimeMethodInfo/class"
import { UnityEngine_MonoBehaviour_Impl as UnityEngine_MonoBehaviour} from "../Object/Component/Behavior/MonoBehaviour/class"

type System_Void = NativePointer
type System_String = string
type EventDelegate_Parameter = NativePointer
// type EventDelegate_Parameter[] = NativePointer
type EventDelegate_Callback = NativePointer
type System_Boolean = boolean
type System_Int32 = number

class EventDelegate_Impl extends System_Object {

        mTarget: UnityEngine_MonoBehaviour = new UnityEngine_MonoBehaviour(lfv(this.handle, "mTarget") )
        mMethodName: System_String = new Il2Cpp.String(lfv(this.handle, "mMethodName")).content!
        mParameters: EventDelegate_Parameter[] = lfv(this.handle, "mParameters") as unknown as EventDelegate_Parameter[]
        oneShot: System_Boolean = !lfv(this.handle, "oneShot").isNull()
        mCachedCallback: EventDelegate_Callback = lfv(this.handle, "mCachedCallback")
        mRawDelegate: System_Boolean = !lfv(this.handle, "mRawDelegate").isNull()
        mCached: System_Boolean = !lfv(this.handle, "mCached").isNull()
        mMethod: RuntimeMethodInfo = new RuntimeMethodInfo(lfv(this.handle, "mMethod"))
        // mParameterInfos: System_Reflection.ParameterInfo[] = lfv(this.handle, "mParameterInfos") as unknown as System_Reflection.ParameterInfo[]
        // mArgs: System_Object[] = lfv(this.handle, "mArgs") as unknown as System_Object[]
        mParameterInfos: NativePointer = lfv(this.handle, "mParameterInfos")
        mArgs: NativePointer = lfv(this.handle, "mArgs") 
        s_Hash: System_Int32 = lfv(this.handle, "s_Hash").toInt32()

        constructor(handleOrWrapper: NativePointer) {
                super(handleOrWrapper)
        }

        get_target(): UnityEngine_MonoBehaviour {
                return Il2Cpp.Api.EventDelegate._get_target(this.handle)
        }

        set_target(value: UnityEngine_MonoBehaviour): System_Void {
                return Il2Cpp.Api.EventDelegate._set_target(this.handle, value)
        }

        get_methodName(): System_String {
                return readU16(Il2Cpp.Api.EventDelegate._get_methodName(this.handle))
        }

        set_methodName(value: System_String): System_Void {
                return Il2Cpp.Api.EventDelegate._set_methodName(this.handle, value)
        }

        get_parameters(): EventDelegate_Parameter[] {
                return Il2Cpp.Api.EventDelegate._get_parameters(this.handle)
        }

        get_isValid(): System_Boolean {
                return Il2Cpp.Api.EventDelegate._get_isValid(this.handle)
        }

        get_isEnabled(): System_Boolean {
                return Il2Cpp.Api.EventDelegate._get_isEnabled(this.handle)
        }

        _ctor_EventDelegate(): System_Void {
                return Il2Cpp.Api.EventDelegate.__ctor(this.handle)
        }

        _ctor_EventDelegate_1(call: EventDelegate_Callback): System_Void {
                return Il2Cpp.Api.EventDelegate.__ctor(this.handle, call)
        }

        _ctor_EventDelegate_2(target: UnityEngine_MonoBehaviour, methodName: System_String): System_Void {
                return Il2Cpp.Api.EventDelegate.__ctor(this.handle, target, methodName)
        }

        static GetMethodName(callback: EventDelegate_Callback): System_String {
                return readU16(Il2Cpp.Api.EventDelegate._GetMethodName(callback))
        }

        static IsValid(callback: EventDelegate_Callback): System_Boolean {
                return Il2Cpp.Api.EventDelegate._IsValid(callback)
        }

        Equals(obj: System_Object): System_Boolean {
                return Il2Cpp.Api.EventDelegate._Equals(this.handle, obj)
        }

        GetHashCode(): System_Int32 {
                return Il2Cpp.Api.EventDelegate._GetHashCode(this.handle)
        }

        Set(call: EventDelegate_Callback): System_Void {
                return Il2Cpp.Api.EventDelegate._Set(this.handle, call)
        }

        Set_2(target: UnityEngine_MonoBehaviour, methodName: System_String): System_Void {
                return Il2Cpp.Api.EventDelegate._Set(this.handle, target, methodName)
        }

        Cache(): System_Void {
                return Il2Cpp.Api.EventDelegate._Cache(this.handle)
        }

        Execute(): System_Boolean {
                return Il2Cpp.Api.EventDelegate._Execute(this.handle)
        }

        Clear(): System_Void {
                return Il2Cpp.Api.EventDelegate._Clear(this.handle)
        }

        ToString(): System_String {
                return readU16(Il2Cpp.Api.EventDelegate._ToString(this.handle))
        }

        // static Execute_1(list:System_Collections.Generic.List<EventDelegate>): System_Void {
        //         return Il2Cpp.Api.EventDelegate._Execute(list)
        // }

        // static IsValid_1(list:System_Collections.Generic.List<EventDelegate>): System_Boolean {
        //         return Il2Cpp.Api.EventDelegate._IsValid(list)
        // }

        // static Set_2(list:System_Collections.Generic.List<EventDelegate>, callback:EventDelegate_Callback): EventDelegate {
        //         return Il2Cpp.Api.EventDelegate._Set(list, callback)
        // }

        // static Set_2(list:System_Collections.Generic.List<EventDelegate>, del:EventDelegate): System_Void {
        //         return Il2Cpp.Api.EventDelegate._Set(list, del)
        // }

        // static Add(list:System_Collections.Generic.List<EventDelegate>, callback:EventDelegate_Callback): EventDelegate {
        //         return Il2Cpp.Api.EventDelegate._Add(list, callback)
        // }

        // static Add_3(list:System_Collections.Generic.List<EventDelegate>, callback:EventDelegate_Callback, oneShot:System_Boolean): EventDelegate {
        //         return Il2Cpp.Api.EventDelegate._Add(list, callback, oneShot)
        // }

        // static Add_2(list:System_Collections.Generic.List<EventDelegate>, ev:EventDelegate): System_Void {
        //         return Il2Cpp.Api.EventDelegate._Add(list, ev)
        // }

        // static Add_3(list:System_Collections.Generic.List<EventDelegate>, ev:EventDelegate, oneShot:System_Boolean): System_Void {
        //         return Il2Cpp.Api.EventDelegate._Add(list, ev, oneShot)
        // }

        // static Remove(list:System_Collections.Generic.List<EventDelegate>, callback:EventDelegate_Callback): System_Boolean {
        //         return Il2Cpp.Api.EventDelegate._Remove(list, callback)
        // }

        // static Remove_2(list:System_Collections.Generic.List<EventDelegate>, ev:EventDelegate): System_Boolean {
        //         return Il2Cpp.Api.EventDelegate._Remove(list, ev)
        // }

        static _cctor_EventDelegate(): System_Void {
                return Il2Cpp.Api.EventDelegate.__cctor()
        }

}

Il2Cpp.EventDelegate = EventDelegate_Impl

declare global {
        namespace Il2Cpp {
                class EventDelegate extends EventDelegate_Impl { }
        }
}

export { EventDelegate_Impl }
