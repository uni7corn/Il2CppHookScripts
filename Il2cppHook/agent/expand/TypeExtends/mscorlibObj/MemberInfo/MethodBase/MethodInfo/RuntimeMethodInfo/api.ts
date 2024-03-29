import { cache } from "decorator-cache-getter"

class System_Reflection_RuntimeMethodInfo_API {
        // internal BindingFlags get_BindingFlags()
        @cache
        static get _get_BindingFlags() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_BindingFlags", 0, [], "pointer", ["pointer"])
        }

        // public override Module get_Module()
        @cache
        static get _get_Module() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_Module", 0, [], "pointer", ["pointer"])
        }

        // private RuntimeType get_ReflectedTypeInternal()
        @cache
        static get _get_ReflectedTypeInternal() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_ReflectedTypeInternal", 0, [], "pointer", ["pointer"])
        }

        // internal override String FormatNameAndSig(Boolean serialization)
        @cache
        static get _FormatNameAndSig() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "FormatNameAndSig", 1, ["System.Boolean"], "pointer", ["pointer","pointer"])
        }

        // public override Delegate CreateDelegate(Type delegateType)
        @cache
        static get _CreateDelegate() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "CreateDelegate", 1, ["System.Type"], "pointer", ["pointer","pointer"])
        }

        // public override Delegate CreateDelegate(Type delegateType, Object target)
        @cache
        static get _CreateDelegate_delegateType_target() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "CreateDelegate", 2, ["System.Type","System.Object"], "pointer", ["pointer","pointer","pointer"])
        }

        // public override String ToString()
        @cache
        static get _ToString() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "ToString", 0, [], "pointer", ["pointer"])
        }

        // internal RuntimeModule GetRuntimeModule()
        @cache
        static get _GetRuntimeModule() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetRuntimeModule", 0, [], "pointer", ["pointer"])
        }

        // public Void GetObjectData(SerializationInfo info, StreamingContext context)
        @cache
        static get _GetObjectData() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetObjectData", 2, ["System.Runtime.Serialization.SerializationInfo","System.Runtime.Serialization.StreamingContext"], "void", ["pointer","pointer","pointer"])
        }

        // internal String SerializationToString()
        @cache
        static get _SerializationToString() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "SerializationToString", 0, [], "pointer", ["pointer"])
        }

        // internal static MethodBase GetMethodFromHandleNoGenericCheck(RuntimeMethodHandle handle)
        @cache
        static get _GetMethodFromHandleNoGenericCheck() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetMethodFromHandleNoGenericCheck", 1, ["System.RuntimeMethodHandle"], "pointer", ["pointer"])
        }

        // internal static MethodBase GetMethodFromHandleNoGenericCheck(RuntimeMethodHandle handle, RuntimeTypeHandle reflectedType)
        @cache
        static get _GetMethodFromHandleNoGenericCheck_handle_reflectedType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetMethodFromHandleNoGenericCheck", 2, ["System.RuntimeMethodHandle","System.RuntimeTypeHandle"], "pointer", ["pointer","pointer"])
        }

        // internal static MethodBase GetMethodFromHandleInternalType(IntPtr method_handle, IntPtr type_handle)
        @cache
        static get _GetMethodFromHandleInternalType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetMethodFromHandleInternalType", 2, ["System.IntPtr","System.IntPtr"], "pointer", ["pointer","pointer"])
        }

        // private static MethodBase GetMethodFromHandleInternalType_native(IntPtr method_handle, IntPtr type_handle, Boolean genericCheck)
        @cache
        static get _GetMethodFromHandleInternalType_native() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetMethodFromHandleInternalType_native", 3, ["System.IntPtr","System.IntPtr","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // internal Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", ".ctor", 0, [], "void", ["pointer"])
        }

        // internal static String get_name(MethodBase method)
        @cache
        static get _get_name() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_name", 1, ["System.Reflection.MethodBase"], "pointer", ["pointer"])
        }

        // internal static RuntimeMethodInfo get_base_method(RuntimeMethodInfo method, Boolean definition)
        @cache
        static get _get_base_method() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_base_method", 2, ["System.Reflection.RuntimeMethodInfo","System.Boolean"], "pointer", ["pointer","pointer"])
        }

        // internal static Int32 get_metadata_token(RuntimeMethodInfo method)
        @cache
        static get _get_metadata_token() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_metadata_token", 1, ["System.Reflection.RuntimeMethodInfo"], "pointer", ["pointer"])
        }

        // public override MethodInfo GetBaseDefinition()
        @cache
        static get _GetBaseDefinition() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetBaseDefinition", 0, [], "pointer", ["pointer"])
        }

        // internal MethodInfo GetBaseMethod()
        @cache
        static get _GetBaseMethod() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetBaseMethod", 0, [], "pointer", ["pointer"])
        }

        // public override ParameterInfo get_ReturnParameter()
        @cache
        static get _get_ReturnParameter() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_ReturnParameter", 0, [], "pointer", ["pointer"])
        }

        // public override Type get_ReturnType()
        @cache
        static get _get_ReturnType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_ReturnType", 0, [], "pointer", ["pointer"])
        }

        // public override Int32 get_MetadataToken()
        @cache
        static get _get_MetadataToken() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_MetadataToken", 0, [], "pointer", ["pointer"])
        }

        // public override MethodImplAttributes GetMethodImplementationFlags()
        @cache
        static get _GetMethodImplementationFlags() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetMethodImplementationFlags", 0, [], "pointer", ["pointer"])
        }

        // public override ParameterInfo[] GetParameters()
        @cache
        static get _GetParameters() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetParameters", 0, [], "pointer", ["pointer"])
        }

        // internal override ParameterInfo[] GetParametersInternal()
        @cache
        static get _GetParametersInternal() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetParametersInternal", 0, [], "pointer", ["pointer"])
        }

        // internal override Int32 GetParametersCount()
        @cache
        static get _GetParametersCount() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetParametersCount", 0, [], "pointer", ["pointer"])
        }

        // internal Object InternalInvoke(Object obj, Object[] parameters, Exception& exc)
        @cache
        static get _InternalInvoke() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "InternalInvoke", 3, ["System.Object","System.Object[]","System.Exception&"], "pointer", ["pointer","pointer","pointer","pointer"])
        }

        // public override Object Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture)
        @cache
        static get _Invoke() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "Invoke", 5, ["System.Object","System.Reflection.BindingFlags","System.Reflection.Binder","System.Object[]","System.Globalization.CultureInfo"], "pointer", ["pointer","pointer","pointer","pointer","pointer","pointer"])
        }

        // internal static Void ConvertValues(Binder binder, Object[] args, ParameterInfo[] pinfo, CultureInfo culture, BindingFlags invokeAttr)
        @cache
        static get _ConvertValues() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "ConvertValues", 5, ["System.Reflection.Binder","System.Object[]","System.Reflection.ParameterInfo[]","System.Globalization.CultureInfo","System.Reflection.BindingFlags"], "void", ["pointer","pointer","pointer","pointer","pointer"])
        }

        // public override RuntimeMethodHandle get_MethodHandle()
        @cache
        static get _get_MethodHandle() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_MethodHandle", 0, [], "pointer", ["pointer"])
        }

        // public override MethodAttributes get_Attributes()
        @cache
        static get _get_Attributes() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_Attributes", 0, [], "pointer", ["pointer"])
        }

        // public override CallingConventions get_CallingConvention()
        @cache
        static get _get_CallingConvention() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_CallingConvention", 0, [], "pointer", ["pointer"])
        }

        // public override Type get_ReflectedType()
        @cache
        static get _get_ReflectedType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_ReflectedType", 0, [], "pointer", ["pointer"])
        }

        // public override Type get_DeclaringType()
        @cache
        static get _get_DeclaringType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_DeclaringType", 0, [], "pointer", ["pointer"])
        }

        // public override String get_Name()
        @cache
        static get _get_Name() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_Name", 0, [], "pointer", ["pointer"])
        }

        // public override Boolean IsDefined(Type attributeType, Boolean inherit)
        @cache
        static get _IsDefined() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "IsDefined", 2, ["System.Type","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // public override Object[] GetCustomAttributes(Boolean inherit)
        @cache
        static get _GetCustomAttributes() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetCustomAttributes", 1, ["System.Boolean"], "pointer", ["pointer","pointer"])
        }

        // public override Object[] GetCustomAttributes(Type attributeType, Boolean inherit)
        @cache
        static get _GetCustomAttributes_attributeType_inherit() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetCustomAttributes", 2, ["System.Type","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // internal Void GetPInvoke(PInvokeAttributes& flags, String& entryPoint, String& dllName)
        @cache
        static get _GetPInvoke() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetPInvoke", 3, ["System.Reflection.PInvokeAttributes&","System.String&","System.String&"], "void", ["pointer","pointer","pointer","pointer"])
        }

        // internal Object[] GetPseudoCustomAttributes()
        @cache
        static get _GetPseudoCustomAttributes() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetPseudoCustomAttributes", 0, [], "pointer", ["pointer"])
        }

        // internal CustomAttributeData[] GetPseudoCustomAttributesData()
        @cache
        static get _GetPseudoCustomAttributesData() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetPseudoCustomAttributesData", 0, [], "pointer", ["pointer"])
        }

        // private CustomAttributeData GetDllImportAttributeData()
        @cache
        static get _GetDllImportAttributeData() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetDllImportAttributeData", 0, [], "pointer", ["pointer"])
        }

        // public override MethodInfo MakeGenericMethod(Type[] methodInstantiation)
        @cache
        static get _MakeGenericMethod() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "MakeGenericMethod", 1, ["System.Type[]"], "pointer", ["pointer","pointer"])
        }

        // private MethodInfo MakeGenericMethod_impl(Type[] types)
        @cache
        static get _MakeGenericMethod_impl() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "MakeGenericMethod_impl", 1, ["System.Type[]"], "pointer", ["pointer","pointer"])
        }

        // public override Type[] GetGenericArguments()
        @cache
        static get _GetGenericArguments() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetGenericArguments", 0, [], "pointer", ["pointer"])
        }

        // private MethodInfo GetGenericMethodDefinition_impl()
        @cache
        static get _GetGenericMethodDefinition_impl() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetGenericMethodDefinition_impl", 0, [], "pointer", ["pointer"])
        }

        // public override MethodInfo GetGenericMethodDefinition()
        @cache
        static get _GetGenericMethodDefinition() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "GetGenericMethodDefinition", 0, [], "pointer", ["pointer"])
        }

        // public override Boolean get_IsGenericMethodDefinition()
        @cache
        static get _get_IsGenericMethodDefinition() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_IsGenericMethodDefinition", 0, [], "pointer", ["pointer"])
        }

        // public override Boolean get_IsGenericMethod()
        @cache
        static get _get_IsGenericMethod() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_IsGenericMethod", 0, [], "pointer", ["pointer"])
        }

        // public override Boolean get_ContainsGenericParameters()
        @cache
        static get _get_ContainsGenericParameters() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_ContainsGenericParameters", 0, [], "pointer", ["pointer"])
        }

        // private static Int32 get_core_clr_security_level()
        @cache
        static get _get_core_clr_security_level() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_core_clr_security_level", 0, [], "pointer", [])
        }

        // public override Boolean get_IsSecurityCritical()
        @cache
        static get _get_IsSecurityCritical() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.RuntimeMethodInfo", "get_IsSecurityCritical", 0, [], "pointer", ["pointer"])
        }

}

mscorlib.Api.RuntimeMethodInfo = System_Reflection_RuntimeMethodInfo_API

declare global {
        namespace mscorlib.Api{
                class RuntimeMethodInfo extends System_Reflection_RuntimeMethodInfo_API { }
        }
}

export { }