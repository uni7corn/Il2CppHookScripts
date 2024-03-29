import { cache } from "decorator-cache-getter"

class System_Reflection_MemberInfo_API {
        // protected Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", ".ctor", 0, [], "void", ["pointer"])
        }

        // public abstract MemberTypes get_MemberType()
        @cache
        static get _get_MemberType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_MemberType", 0, [], "pointer", ["pointer"])
        }

        // public abstract String get_Name()
        @cache
        static get _get_Name() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_Name", 0, [], "pointer", ["pointer"])
        }

        // public abstract Type get_DeclaringType()
        @cache
        static get _get_DeclaringType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_DeclaringType", 0, [], "pointer", ["pointer"])
        }

        // public abstract Type get_ReflectedType()
        @cache
        static get _get_ReflectedType() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_ReflectedType", 0, [], "pointer", ["pointer"])
        }

        // public virtual Module get_Module()
        @cache
        static get _get_Module() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_Module", 0, [], "pointer", ["pointer"])
        }

        // public abstract Boolean IsDefined(Type attributeType, Boolean inherit)
        @cache
        static get _IsDefined() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "IsDefined", 2, ["System.Type","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // public abstract Object[] GetCustomAttributes(Boolean inherit)
        @cache
        static get _GetCustomAttributes() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "GetCustomAttributes", 1, ["System.Boolean"], "pointer", ["pointer","pointer"])
        }

        // public abstract Object[] GetCustomAttributes(Type attributeType, Boolean inherit)
        @cache
        static get _GetCustomAttributes_attributeType_inherit() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "GetCustomAttributes", 2, ["System.Type","System.Boolean"], "pointer", ["pointer","pointer","pointer"])
        }

        // public virtual Int32 get_MetadataToken()
        @cache
        static get _get_MetadataToken() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "get_MetadataToken", 0, [], "pointer", ["pointer"])
        }

        // public override Boolean Equals(Object obj)
        @cache
        static get _Equals() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "Equals", 1, ["System.Object"], "pointer", ["pointer","pointer"])
        }

        // public override Int32 GetHashCode()
        @cache
        static get _GetHashCode() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "GetHashCode", 0, [], "pointer", ["pointer"])
        }

        // public static Boolean op_Equality(MemberInfo left, MemberInfo right)
        @cache
        static get _op_Equality() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "op_Equality", 2, ["System.Reflection.MemberInfo","System.Reflection.MemberInfo"], "pointer", ["pointer","pointer"])
        }

        // public static Boolean op_Inequality(MemberInfo left, MemberInfo right)
        @cache
        static get _op_Inequality() {
                return Il2Cpp.Api.o("mscorlib", "System.Reflection.MemberInfo", "op_Inequality", 2, ["System.Reflection.MemberInfo","System.Reflection.MemberInfo"], "pointer", ["pointer","pointer"])
        }

}

mscorlib.Api.MemberInfo = System_Reflection_MemberInfo_API

declare global {
    namespace mscorlib.Api{
        class MemberInfo extends System_Reflection_MemberInfo_API { }
    }
}

export { }