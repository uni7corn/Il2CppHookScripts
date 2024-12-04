const test = ()=>{

    var s = new ObjC.Block({
        retType: 'void',
        argTypes: ["object", "int"],
        implementation: function () {
            console.log(`block`)
        }
    })

    Interceptor.detachAll()
    var old_func = ObjC.classes.NSURL.URLWithString_.implementation
    Interceptor.attach(old_func, {
        onEnter(args) {
            console.warn("called URLWithString:")
            console.log(`${new ObjC.Object(args[0])}`)
            console.log(`${ObjC.selectorAsString(args[1])}`)
            console.log(`${new ObjC.Object(args[2])}`)
            console.log(`${args[3]}`)
        },
    })

    var method = ObjC.classes.NSURL.URLWithString_
    var old_impl = method.implementation
    // + (instancetype)URLWithString:(NSString *)URLString;
    method.implementation = ObjC.implement(method, function (clazz, selector, URLString) {
        console.warn(`called URLWithString: ${new ObjC.Object(URLString)}`)
        return old_impl(clazz, selector, URLString)
    })

    // - (void)enumerateObjectsUsingBlock:(void (^)(id obj, NSUInteger idx, BOOL *stop))block;
    var arr = ObjC.classes.NSMutableArray.array()
    arr.addObject_("123")
    arr.addObject_(124)
    var handler = new ObjC.Block({
        retType: "void",
        argTypes: ["object", "int", "int"],
        implementation: (a, b, c) => {
            console.warn(a, b, c)
            var obj = new ObjC.Object(a)
            console.log(`class:${obj.$class} | className:${obj.$className}| superClass:${obj.$superClass}`)
            console.log(`ivars:${obj.$ivars} | moduleName:${obj.$moduleName} | super:${obj.$super} | protocols:${obj.$protocols}`)
        }
    })
    arr.enumerateObjectsUsingBlock_(handler)


    new ApiResolver("module")
        /**
         * + / - 可以使用 * 来替换 
         * URL 匹配类
         * *URLString* 匹配方法
         * 都支持正则表达式
         */
        .enumerateMatches("exports:*!CC_*")
        .forEach(item => {
            console.log(`${item.address} | ${item.name}`)
            // 匹配到函数以后 这里就可以正常的使用 Interceptor进行hook ...
        })

    Interceptor.detachAll()
    ObjC.classes.NSURL.$methods.forEach(item => {
        var address = ptr(ObjC.classes.NSURL[item].implementation)
        if (item.includes("URLWithString"))
            // console.log(`${address} -> ${item}`)
            console.log(`${ObjC.classes.NSURL[item]}`)
        Interceptor.attach(address, {
            onEnter(args) {
                console.warn(`called ${item}`)
            },
        })
    })

    // [iOS Device::小红书 ]-> Process.findModuleByName("libobjc.A.dylib")
    // {
    //     "base": "0x1bdfa2000",
    //     "name": "libobjc.A.dylib",
    //     "path": "/usr/lib/libobjc.A.dylib",
    //     "size": 204800
    // }
    var lib = Process.findModuleByName("libobjc.A.dylib")!
    var f = new File("/var/root/libobjc.A.dylib", "rwx")
    f.write(lib.base.readByteArray(lib.size)!)

}