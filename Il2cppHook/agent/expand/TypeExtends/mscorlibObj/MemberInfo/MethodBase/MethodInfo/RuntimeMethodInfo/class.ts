import { mscorlib_System_Object_impl as System_Object} from "../../../../class"
import { System_Delegate_Impl } from "../../../../Delegate/class"
import { mscorlib_System_Type_impl as System_Type} from "../../../../Type/class"
import { System_Reflection_MethodInfo_Impl } from "../class"

class System_Reflection_RuntimeMethodInfo_Impl extends System_Reflection_MethodInfo_Impl {

        mhandle: System_IntPtr = lfv(this.handle, "mhandle")
        name: System_String = readU16(lfv(this.handle, "name").isNull() ? Il2Cpp.String.from("NULL"): lfv(this.handle, "name"))
        reftype: System_Type = new System_Type(lfv(this.handle, "reftype"))
        // reftype: NativePointer = lfv(this.handle, "reftype")

        constructor(handleOrWrapper: NativePointer) {
                 super(handleOrWrapper)
        }

        toString(): string {
                try {
                        return this.name + ' ' + this.reftype.toString() + ' ' + this.mhandle
                } catch (error) {
                        return `${this.mhandle}`
                }
        }

        // get_BindingFlags(): System_Reflection.BindingFlags {
        //         return mscorlib.Api.RuntimeMethodInfo._get_BindingFlags(this.handle)
        // }

        // get_Module(): System_Reflection.Module {
        //         return mscorlib.Api.RuntimeMethodInfo._get_Module(this.handle)
        // }

        get methodHandle(): Il2Cpp.Method | null{
                try {
                        return new Il2Cpp.Method(this.mhandle)
                } catch (error) {
                        // LOGE(`DEBUG INFO ! \n${this} ${this.mhandle}`)
                        // lfs(this.handle)
                        return null
                }
        }

        get_ReflectedTypeInternal(): System_RuntimeType {
                return mscorlib.Api.RuntimeMethodInfo._get_ReflectedTypeInternal(this.handle)
        }

        FormatNameAndSig(serialization:System_Boolean): System_String {
                return readU16(mscorlib.Api.RuntimeMethodInfo._FormatNameAndSig(this.handle , serialization))
        }

        CreateDelegate(delegateType:System_Type): System_Delegate {
                return mscorlib.Api.RuntimeMethodInfo._CreateDelegate(this.handle , delegateType)
        }

        CreateDelegate_2(delegateType:System_Type, target:System_Object): System_Delegate {
                return mscorlib.Api.RuntimeMethodInfo._CreateDelegate(this.handle , delegateType, target)
        }

        ToString(): System_String {
                return readU16(mscorlib.Api.RuntimeMethodInfo._ToString(this.handle))
        }

        // GetRuntimeModule(): System_Reflection.RuntimeModule {
        //         return mscorlib.Api.RuntimeMethodInfo._GetRuntimeModule(this.handle)
        // }

        // GetObjectData(info:System_Runtime.Serialization.SerializationInfo, context:System_Runtime.Serialization.StreamingContext): System_Void {
        //         return mscorlib.Api.RuntimeMethodInfo._GetObjectData(this.handle , info, context)
        // }

        SerializationToString(): System_String {
                return readU16(mscorlib.Api.RuntimeMethodInfo._SerializationToString(this.handle))
        }

        // static GetMethodFromHandleNoGenericCheck(handle:System_RuntimeMethodHandle): System_Reflection.MethodBase {
        //         return mscorlib.Api.RuntimeMethodInfo._GetMethodFromHandleNoGenericCheck(handle)
        // }

        // static GetMethodFromHandleNoGenericCheck_2(handle:System_RuntimeMethodHandle, reflectedType:System_RuntimeTypeHandle): System_Reflection.MethodBase {
        //         return mscorlib.Api.RuntimeMethodInfo._GetMethodFromHandleNoGenericCheck(handle, reflectedType)
        // }

        // static GetMethodFromHandleInternalType(method_handle:System_IntPtr, type_handle:System_IntPtr): System_Reflection.MethodBase {
        //         return mscorlib.Api.RuntimeMethodInfo._GetMethodFromHandleInternalType(method_handle, type_handle)
        // }

        // static GetMethodFromHandleInternalType_native(method_handle:System_IntPtr, type_handle:System_IntPtr, genericCheck:System_Boolean): System_Reflection.MethodBase {
        //         return mscorlib.Api.RuntimeMethodInfo._GetMethodFromHandleInternalType_native(method_handle, type_handle, genericCheck)
        // }

        _ctor_RuntimeMethodInfo(): System_Void {
                return mscorlib.Api.RuntimeMethodInfo.__ctor(this.handle)
        }

        // static get_name(method:System_Reflection.MethodBase): System_String {
        //         return readU16(mscorlib.Api.RuntimeMethodInfo._get_name(method))
        // }

        // static get_base_method(method:System_Reflection.RuntimeMethodInfo, definition:System_Boolean): System_Reflection.RuntimeMethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._get_base_method(method, definition)
        // }

        // static get_metadata_token(method:System_Reflection.RuntimeMethodInfo): System_Int32 {
        //         return mscorlib.Api.RuntimeMethodInfo._get_metadata_token(method)
        // }

        // GetBaseDefinition(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._GetBaseDefinition(this.handle)
        // }

        // GetBaseMethod(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._GetBaseMethod(this.handle)
        // }

        // get_ReturnParameter(): System_Reflection.ParameterInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._get_ReturnParameter(this.handle)
        // }

        get_ReturnType(): System_Type {
                return mscorlib.Api.RuntimeMethodInfo._get_ReturnType(this.handle)
        }

        get_MetadataToken(): System_Int32 {
                return mscorlib.Api.RuntimeMethodInfo._get_MetadataToken(this.handle)
        }

        // GetMethodImplementationFlags(): System_Reflection.MethodImplAttributes {
        //         return mscorlib.Api.RuntimeMethodInfo._GetMethodImplementationFlags(this.handle)
        // }

        // GetParameters(): System_Reflection.ParameterInfo[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetParameters(this.handle)
        // }

        // GetParametersInternal(): System_Reflection.ParameterInfo[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetParametersInternal(this.handle)
        // }

        GetParametersCount(): System_Int32 {
                return mscorlib.Api.RuntimeMethodInfo._GetParametersCount(this.handle)
        }

        // InternalInvoke(obj:System_Object, parameters:System_Object_Array, exc:System_Exception): System_Object {
        //         return mscorlib.Api.RuntimeMethodInfo._InternalInvoke(this.handle , obj, parameters, exc)
        // }

        // Invoke(obj:System_Object, invokeAttr:System_Reflection.BindingFlags, binder:System_Reflection.Binder, parameters:System_Object_Array, culture:System_Globalization.CultureInfo): System_Object {
        //         return mscorlib.Api.RuntimeMethodInfo._Invoke(this.handle , obj, invokeAttr, binder, parameters, culture)
        // }

        // static ConvertValues(binder:System_Reflection.Binder, args:System_Object_Array, pinfo:System_Reflection.ParameterInfo_Array, culture:System_Globalization.CultureInfo, invokeAttr:System_Reflection.BindingFlags): System_Void {
        //         return mscorlib.Api.RuntimeMethodInfo._ConvertValues(binder, args, pinfo, culture, invokeAttr)
        // }

        get_MethodHandle(): System_RuntimeMethodHandle {
                return mscorlib.Api.RuntimeMethodInfo._get_MethodHandle(this.handle)
        }

        // get_Attributes(): System_Reflection.MethodAttributes {
        //         return mscorlib.Api.RuntimeMethodInfo._get_Attributes(this.handle)
        // }

        // get_CallingConvention(): System_Reflection.CallingConventions {
        //         return mscorlib.Api.RuntimeMethodInfo._get_CallingConvention(this.handle)
        // }

        // get_ReflectedType(): System_Type {
        //         return new System_Type(mscorlib.Api.RuntimeMethodInfo._get_ReflectedType(this.handle))
        // }

        // get_DeclaringType(): System_Type {
        //         return mscorlib.Api.RuntimeMethodInfo._get_DeclaringType(this.handle)
        // }

        get_Name(): System_String {
                return readU16(mscorlib.Api.RuntimeMethodInfo._get_Name(this.handle))
        }

        // IsDefined(attributeType:System_Type, inherit:System_Boolean): System_Boolean {
        //         return mscorlib.Api.RuntimeMethodInfo._IsDefined(this.handle , attributeType, inherit)
        // }

        // GetCustomAttributes(inherit:System_Boolean): System_Object[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetCustomAttributes(this.handle , inherit)
        // }

        // GetCustomAttributes_2(attributeType:System_Type, inherit:System_Boolean): System_Object[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetCustomAttributes(this.handle , attributeType, inherit)
        // }

        // GetPInvoke(flags:System_Reflection.PInvokeAttributes, entryPoint:System_String, dllName:System_String): System_Void {
        //         return mscorlib.Api.RuntimeMethodInfo._GetPInvoke(this.handle , flags, entryPoint, dllName)
        // }

        // GetPseudoCustomAttributes(): System_Object[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetPseudoCustomAttributes(this.handle)
        // }

        // GetPseudoCustomAttributesData(): System_Reflection.CustomAttributeData[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetPseudoCustomAttributesData(this.handle)
        // }

        // GetDllImportAttributeData(): System_Reflection.CustomAttributeData {
        //         return mscorlib.Api.RuntimeMethodInfo._GetDllImportAttributeData(this.handle)
        // }

        // MakeGenericMethod(methodInstantiation:System_Type_Array): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._MakeGenericMethod(this.handle , methodInstantiation)
        // }

        // MakeGenericMethod_impl(types:System_Type_Array): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._MakeGenericMethod_impl(this.handle , types)
        // }

        // GetGenericArguments(): System_Type[] {
        //         return mscorlib.Api.RuntimeMethodInfo._GetGenericArguments(this.handle)
        // }

        // GetGenericMethodDefinition_impl(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._GetGenericMethodDefinition_impl(this.handle)
        // }

        // GetGenericMethodDefinition(): System_Reflection.MethodInfo {
        //         return mscorlib.Api.RuntimeMethodInfo._GetGenericMethodDefinition(this.handle)
        // }

        get_IsGenericMethodDefinition(): System_Boolean {
                return mscorlib.Api.RuntimeMethodInfo._get_IsGenericMethodDefinition(this.handle)
        }

        get_IsGenericMethod(): System_Boolean {
                return mscorlib.Api.RuntimeMethodInfo._get_IsGenericMethod(this.handle)
        }

        get_ContainsGenericParameters(): System_Boolean {
                return mscorlib.Api.RuntimeMethodInfo._get_ContainsGenericParameters(this.handle)
        }

        static get_core_clr_security_level(): System_Int32 {
                return mscorlib.Api.RuntimeMethodInfo._get_core_clr_security_level()
        }

        get_IsSecurityCritical(): System_Boolean {
                return mscorlib.Api.RuntimeMethodInfo._get_IsSecurityCritical(this.handle)
        }

}

// type System_Reflection.BindingFlags = NativePointer
// type System_Reflection.Module = NativePointer
type System_IntPtr = NativePointer
type System_RuntimeType = NativePointer
type System_String = string
type System_Delegate = System_Delegate_Impl
// type System_Reflection.RuntimeModule = NativePointer
type System_Void = void
// type System_Reflection.MethodBase = NativePointer
// type System_Reflection.RuntimeMethodInfo = NativePointer
type System_Int32 = number
// type System_Reflection.MethodInfo = NativePointer
// type System_Reflection.ParameterInfo = NativePointer
// type System_Reflection.MethodImplAttributes = NativePointer
// type System_Reflection.ParameterInfo[] = NativePointer
// type System_Object = NativePointer
type System_RuntimeMethodHandle = NativePointer
// type System_Reflection.MethodAttributes = NativePointer
// type System_Reflection.CallingConventions = NativePointer
type System_Boolean = NativePointer
// type System_Object[] = NativePointer
// type System_Reflection.CustomAttributeData[] = NativePointer
// type System_Reflection.CustomAttributeData = NativePointer
// type System_Type[] = NativePointer


mscorlib.RuntimeMethodInfo = System_Reflection_RuntimeMethodInfo_Impl

declare global {
        namespace mscorlib{
                class RuntimeMethodInfo extends System_Reflection_RuntimeMethodInfo_Impl { }
        }
}

export { System_Reflection_RuntimeMethodInfo_Impl }