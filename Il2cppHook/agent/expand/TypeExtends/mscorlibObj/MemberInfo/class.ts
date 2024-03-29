import { mscorlib_System_Object_impl as System_Object } from "../class"

type System_Void = void
type System_String = string
type System_Type = NativePointer
type System_Boolean = boolean
type System_Int32 = number

class System_Reflection_MemberInfo_Impl extends System_Object {

    constructor(handleOrWrapper: NativePointer) {
             super(handleOrWrapper)
    }

    _ctor_MemberInfo(): System_Void {
            return mscorlib.Api.MemberInfo.__ctor(this.handle)
    }

    // get_MemberType(): System_Reflection.MemberTypes {
    //         return mscorlib.Api.MemberInfo._get_MemberType(this.handle)
    // }

    // get_Name(): System_String {
    //         return readU16(mscorlib.Api.MemberInfo._get_Name(this.handle))
    // }

    get_DeclaringType(): System_Type {
            return mscorlib.Api.MemberInfo._get_DeclaringType(this.handle)
    }

    get_ReflectedType(): System_Type {
            return mscorlib.Api.MemberInfo._get_ReflectedType(this.handle)
    }

    // get_Module(): System_Reflection.Module {
    //         return mscorlib.Api.MemberInfo._get_Module(this.handle)
    // }

    IsDefined(attributeType:System_Type, inherit:System_Boolean): System_Boolean {
            return mscorlib.Api.MemberInfo._IsDefined(this.handle , attributeType, inherit)
    }

    GetCustomAttributes(inherit:System_Boolean): System_Object[] {
            return mscorlib.Api.MemberInfo._GetCustomAttributes(this.handle , inherit)
    }

    GetCustomAttributes_2(attributeType:System_Type, inherit:System_Boolean): System_Object[] {
            return mscorlib.Api.MemberInfo._GetCustomAttributes(this.handle , attributeType, inherit)
    }

    get_MetadataToken(): System_Int32 {
            return mscorlib.Api.MemberInfo._get_MetadataToken(this.handle)
    }

    Equals(obj:System_Object): System_Boolean {
            return mscorlib.Api.MemberInfo._Equals(this.handle , obj)
    }

    GetHashCode(): System_Int32 {
            return mscorlib.Api.MemberInfo._GetHashCode(this.handle)
    }

    // static op_Equality(left:System_Reflection.MemberInfo, right:System_Reflection.MemberInfo): System_Boolean {
    //         return mscorlib.Api.MemberInfo._op_Equality(left, right)
    // }

    // static op_Inequality(left:System_Reflection.MemberInfo, right:System_Reflection.MemberInfo): System_Boolean {
    //         return mscorlib.Api.MemberInfo._op_Inequality(left, right)
    // }

}

mscorlib.MemberInfo = System_Reflection_MemberInfo_Impl

declare global {
    namespace mscorlib{
            class MemberInfo extends System_Reflection_MemberInfo_Impl { }
    }
}

export { System_Reflection_MemberInfo_Impl }
