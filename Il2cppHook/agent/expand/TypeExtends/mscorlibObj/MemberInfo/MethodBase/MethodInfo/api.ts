import { cache } from "decorator-cache-getter"

class System_Reflection_MethodInfo_API {
        // protected Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", ".ctor", 0, [], "void", ["pointer"])
        }

        // public override MemberTypes get_MemberType()
        @cache
        static get _get_MemberType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "get_MemberType", 0, [], "pointer", ["pointer"])
        }

        // public virtual ParameterInfo get_ReturnParameter()
        @cache
        static get _get_ReturnParameter() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "get_ReturnParameter", 0, [], "pointer", ["pointer"])
        }

        // public virtual Type get_ReturnType()
        @cache
        static get _get_ReturnType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "get_ReturnType", 0, [], "pointer", ["pointer"])
        }

        // public override Type[] GetGenericArguments()
        @cache
        static get _GetGenericArguments() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "GetGenericArguments", 0, [], "pointer", ["pointer"])
        }

        // public virtual MethodInfo GetGenericMethodDefinition()
        @cache
        static get _GetGenericMethodDefinition() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "GetGenericMethodDefinition", 0, [], "pointer", ["pointer"])
        }

        // public virtual MethodInfo MakeGenericMethod(Type[] typeArguments)
        @cache
        static get _MakeGenericMethod() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "MakeGenericMethod", 1, ["System.Type[]"], "pointer", ["pointer","pointer"])
        }

        // public abstract MethodInfo GetBaseDefinition()
        @cache
        static get _GetBaseDefinition() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "GetBaseDefinition", 0, [], "pointer", ["pointer"])
        }

        // public virtual Delegate CreateDelegate(Type delegateType)
        @cache
        static get _CreateDelegate() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "CreateDelegate", 1, ["System.Type"], "pointer", ["pointer","pointer"])
        }

        // public virtual Delegate CreateDelegate(Type delegateType, Object target)
        @cache
        static get _CreateDelegate_delegateType_target() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "CreateDelegate", 2, ["System.Type","System.Object"], "pointer", ["pointer","pointer","pointer"])
        }

        // public override Boolean Equals(Object obj)
        @cache
        static get _Equals() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "Equals", 1, ["System.Object"], "pointer", ["pointer","pointer"])
        }

        // public override Int32 GetHashCode()
        @cache
        static get _GetHashCode() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "GetHashCode", 0, [], "pointer", ["pointer"])
        }

        // public static Boolean op_Equality(MethodInfo left, MethodInfo right)
        @cache
        static get _op_Equality() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "op_Equality", 2, ["System.Reflection.MethodInfo","System.Reflection.MethodInfo"], "pointer", ["pointer","pointer"])
        }

        // public static Boolean op_Inequality(MethodInfo left, MethodInfo right)
        @cache
        static get _op_Inequality() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "op_Inequality", 2, ["System.Reflection.MethodInfo","System.Reflection.MethodInfo"], "pointer", ["pointer","pointer"])
        }

        // internal virtual Int32 get_GenericParameterCount()
        @cache
        static get _get_GenericParameterCount() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MethodInfo", "get_GenericParameterCount", 0, [], "pointer", ["pointer"])
        }

}

mscorlib.Api.MethodInfo = System_Reflection_MethodInfo_API

declare global {
        namespace mscorlib.Api{
                class MethodInfo extends System_Reflection_MethodInfo_API { }
        }
}

export { }