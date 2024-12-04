import { System_Reflection_MemberInfo_Impl } from "../class"

class System_Reflection_MethodBase_Impl extends System_Reflection_MemberInfo_Impl {

        constructor(handleOrWrapper: NativePointer) {
                 super(handleOrWrapper)
        }

        _ctor_MethodBase(): System_Void {
                return mscorlib.Api.MethodBase.__ctor(this.handle)
        }

        // GetParameters(): System_Reflection.ParameterInfo[] {
        //         return mscorlib.Api.MethodBase._GetParameters(this.handle)
        // }

        // get_Attributes(): System_Reflection.MethodAttributes {
        //         return mscorlib.Api.MethodBase._get_Attributes(this.handle)
        // }

        // GetMethodImplementationFlags(): System_Reflection.MethodImplAttributes {
        //         return mscorlib.Api.MethodBase._GetMethodImplementationFlags(this.handle)
        // }

        // get_CallingConvention(): System_Reflection.CallingConventions {
        //         return mscorlib.Api.MethodBase._get_CallingConvention(this.handle)
        // }

        get_IsAbstract(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsAbstract(this.handle)
        }

        get_IsConstructor_MethodBase(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsConstructor(this.handle)
        }

        get_IsSpecialName(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsSpecialName(this.handle)
        }

        get_IsStatic(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsStatic(this.handle)
        }

        get_IsVirtual(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsVirtual(this.handle)
        }

        get_IsPublic(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsPublic(this.handle)
        }

        get_IsGenericMethod(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsGenericMethod(this.handle)
        }

        get_IsGenericMethodDefinition(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsGenericMethodDefinition(this.handle)
        }

        // GetGenericArguments(): System_Type[] {
        //         return mscorlib.Api.MethodBase._GetGenericArguments(this.handle)
        // }

        get_ContainsGenericParameters(): System_Boolean {
                return mscorlib.Api.MethodBase._get_ContainsGenericParameters(this.handle)
        }

        // Invoke(obj:System_Object, parameters:System_Object_Array): System_Object {
        //         return mscorlib.Api.MethodBase._Invoke(this.handle , obj, parameters)
        // }

        // Invoke_5(obj:System_Object, invokeAttr:System_Reflection.BindingFlags, binder:System_Reflection.Binder, parameters:System_Object_Array, culture:System_Globalization.CultureInfo): System_Object {
        //         return mscorlib.Api.MethodBase._Invoke(this.handle , obj, invokeAttr, binder, parameters, culture)
        // }

        get_MethodHandle(): System_RuntimeMethodHandle {
                return mscorlib.Api.MethodBase._get_MethodHandle(this.handle)
        }

        get_IsSecurityCritical(): System_Boolean {
                return mscorlib.Api.MethodBase._get_IsSecurityCritical(this.handle)
        }

        // Equals(obj:System_Object): System_Boolean {
        //         return mscorlib.Api.MethodBase._Equals(this.handle , obj)
        // }

        // GetHashCode(): System_Int32 {
        //         return mscorlib.Api.MethodBase._GetHashCode(this.handle)
        // }

        // static op_Equality(left:System_Reflection.MethodBase, right:System_Reflection.MethodBase): System_Boolean {
        //         return mscorlib.Api.MethodBase._op_Equality(left, right)
        // }

        // static op_Inequality(left:System_Reflection.MethodBase, right:System_Reflection.MethodBase): System_Boolean {
        //         return mscorlib.Api.MethodBase._op_Inequality(left, right)
        // }

        // GetParametersInternal(): System_Reflection.ParameterInfo[] {
        //         return mscorlib.Api.MethodBase._GetParametersInternal(this.handle)
        // }

        // GetParametersCount(): System_Int32 {
        //         return mscorlib.Api.MethodBase._GetParametersCount(this.handle)
        // }

        // FormatNameAndSig(serialization:System_Boolean): System_String {
        //         return readU16(mscorlib.Api.MethodBase._FormatNameAndSig(this.handle , serialization))
        // }

        // GetParameterTypes(): System_Type[] {
        //         return mscorlib.Api.MethodBase._GetParameterTypes(this.handle)
        // }

        // GetParametersNoCopy(): System_Reflection.ParameterInfo[] {
        //         return mscorlib.Api.MethodBase._GetParametersNoCopy(this.handle)
        // }

        // static GetMethodFromHandle(handle:System_RuntimeMethodHandle): System_Reflection.MethodBase {
        //         return mscorlib.Api.MethodBase._GetMethodFromHandle(handle)
        // }

        // static ConstructParameters(parameterTypes:System_Type_Array, callingConvention:System_Reflection.CallingConventions, serialization:System_Boolean): System_String {
        //         return readU16(mscorlib.Api.MethodBase._ConstructParameters(parameterTypes, callingConvention, serialization))
        // }

        // static GetCurrentMethod(): System_Reflection.MethodBase {
        //         return mscorlib.Api.MethodBase._GetCurrentMethod()
        // }

}

type System_Void = string
type System_Boolean = NativePointer
type System_RuntimeMethodHandle = NativePointer

mscorlib.MethodBase = System_Reflection_MethodBase_Impl

declare global {
        namespace mscorlib{
                class MethodBase extends System_Reflection_MethodBase_Impl { }
        }
}

export { System_Reflection_MethodBase_Impl }
