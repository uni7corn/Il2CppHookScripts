import { System_Reflection_MethodBase_Impl } from "../class"

class System_Reflection_MethodInfo_Impl extends System_Reflection_MethodBase_Impl {

        constructor(handleOrWrapper: NativePointer) {
                 super(handleOrWrapper)
        }

        // _ctor_MethodInfo(): System_Void {
        //         return mscorlib.Api.MethodInfo.__ctor(this.handle)
        // }

        // get_MemberType(): System_Reflection.MemberTypes {
        //         return mscorlib.Api.MethodInfo._get_MemberType(this.handle)
        // }

        // get_ReturnParameter(): System_Reflection.ParameterInfo {
        //         return mscorlib.Api.MethodInfo._get_ReturnParameter(this.handle)
        // }

        // get_ReturnType(): System_Type {
        //         return mscorlib.Api.MethodInfo._get_ReturnType(this.handle)
        // }

        // GetGenericArguments(): System_Type[] {
        //         return mscorlib.Api.MethodInfo._GetGenericArguments(this.handle)
        // }

        // GetGenericMethodDefinition(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.MethodInfo._GetGenericMethodDefinition(this.handle)
        // }

        // MakeGenericMethod(typeArguments:System_Type_Array): System_Reflection.MethodInfo {
        //         return mscorlib.Api.MethodInfo._MakeGenericMethod(this.handle , typeArguments)
        // }

        // GetBaseDefinition(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.MethodInfo._GetBaseDefinition(this.handle)
        // }

        // CreateDelegate(delegateType:System_Type): System_Delegate {
        //         return mscorlib.Api.MethodInfo._CreateDelegate(this.handle , delegateType)
        // }

        // CreateDelegate_2(delegateType:System_Type, target:System_Object): System_Delegate {
        //         return mscorlib.Api.MethodInfo._CreateDelegate(this.handle , delegateType, target)
        // }

        // Equals(obj:System_Object): System_Boolean {
        //         return mscorlib.Api.MethodInfo._Equals(this.handle , obj)
        // }

        // GetHashCode(): System_Int32 {
        //         return mscorlib.Api.MethodInfo._GetHashCode(this.handle)
        // }

        // static op_Equality(left:System_Reflection.MethodInfo, right:System_Reflection.MethodInfo): System_Boolean {
        //         return mscorlib.Api.MethodInfo._op_Equality(left, right)
        // }

        // static op_Inequality(left:System_Reflection.MethodInfo, right:System_Reflection.MethodInfo): System_Boolean {
        //         return mscorlib.Api.MethodInfo._op_Inequality(left, right)
        // }

        get_GenericParameterCount(): System_Int32 {
                return mscorlib.Api.MethodInfo._get_GenericParameterCount(this.handle)
        }

}

type System_Void = void
// type System_Reflection.MemberTypes = NativePointer
// type System_Reflection.ParameterInfo = NativePointer
// type System_Type = NativePointer
// type System_Type[] = NativePointer
// type System_Reflection.MethodInfo = NativePointer
// type System_Delegate = NativePointer
type System_Boolean = boolean
type System_Int32 = number


mscorlib.MethodInfo = System_Reflection_MethodInfo_Impl

declare global {
        namespace mscorlib{
                class MethodInfo extends System_Reflection_MethodInfo_Impl { }
        }
}

export { System_Reflection_MethodInfo_Impl }