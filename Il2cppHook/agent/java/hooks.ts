import { getThreadName } from "../base/extends"

export function HookReflect(bt: boolean = true) {
    Java.perform(() => {
        let Method = Java.use('java.lang.reflect.Method')
        Method.invoke.overload('java.lang.Object', '[Ljava.lang.Object;').implementation = function (obj: any, args: any) {
            if (Hooks_value_hideJavaLog) return this.invoke(obj, args)
            let params: string = args.length == 0 ? '' : JSON.stringify(args)
            LOGW(`CALLED -> ${this.toString()}`)
            LOGZ(`\tPARAMS[${args.length}] -> ${params}`)
            if (bt) PrintStackTraceJava()
            return this.invoke(obj, args)
        }
    })
}

export function HookSharedPreferences(bt: boolean = false) {
    // android.app.SharedPreferencesImpl$EditorImpl
    hookJavaClass("android.app.SharedPreferencesImpl$EditorImpl", (_methodName, _methodSignature, _args) => {
        return {
            skipOriginal: false,
            parseValue: !Hooks_value_hideJavaLog,
            after: !bt ? undefined : (_this: any, _args: any, returnValue: any) => {
                PrintStackTraceJava()
                return returnValue
            }
        }
    })

    // android.app.SharedPreferencesImpl
    hookJavaClass("android.app.SharedPreferencesImpl", (_methodName, _methodSignature, _args) => {
        return {
            skipOriginal: false,
            parseValue: !Hooks_value_hideJavaLog,
            after: !bt ? undefined : (_this: any, _args: any, returnValue: any) => {
                PrintStackTraceJava()
                return returnValue
            }
        }
    })
}

export function HookIntent(bt: boolean = false) {
    // Java.perform(function(){
    //     Java.use("android.content.Intent").startActivity.implementation = function(){
    //         console.warn("\n--------------\tCalled Intent.startActivity\t--------------")
    //         console.log("Intent.startActivity(\x1b[96m'"+this+"'\x1b[0m)")
    //         PrintStackTraceJava()
    //         return this.startActivity()
    //     }
    // })

    // android.content.Intent
    hookJavaClass("android.content.Intent", (_methodName, _methodSignature, _args) => {
        return {
            skipOriginal: false,
            parseValue: !Hooks_value_hideJavaLog,
            after: !bt ? undefined : (_this: any, _args: any, returnValue: any) => {
                PrintStackTraceJava()
                return returnValue
            }
        }
    })
}

export function HookStartActivity(bt: boolean = true) {
    Java.perform(function () {
        const Activity = Java.use('android.app.Activity')
        Activity.onCreate.overload('android.os.Bundle').implementation = function (bundle: any) {
            if (Hooks_value_hideJavaLog) return this.onCreate(bundle)
            console.info('Activity started: ' + this)
            if (bt) PrintStackTraceJava()
            // Call the original onCreate method
            this.onCreate(bundle)
        }
    })
}

function HookJavaToast(bt: boolean = true) {
    Java.use("android.widget.Toast").makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function (context: any, text: string, duration: number) {
        if (Hooks_value_hideJavaLog) return this.makeText(context, text, duration)
        console.warn("\n--------------\tCalled Toast.makeText\t--------------")
        let duration_str = "Toast.LENGTH_SHORT"
        if (duration == 1) duration_str = "Toast.LENGTH_LONG"
        console.log("Toast.makeText(\x1b[96m'" + JSON.stringify(context) + "','" + text + "','" + duration_str + "'\x1b[0m)")
        if (bt) PrintStackTraceJava()
        return this.makeText(context, text, duration)
    }
}

function HookLog(bt: boolean = true) {

    const isShowPrintStack = bt
    // const filter = ["AppLovinSdk","VIVI","BGAQ","opqwt","AppLovinManager","MM"]
    const filter: any[] = []

    Java.perform(() => {
        logD()
        logI()
        logE()
    })

    function logD() {
        const Log = Java.use("android.util.Log")
        Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (str0: string | any[], str1: any) {
            if (filter.length != 0) {
                filter.forEach(function (item) {
                    if (str0.indexOf(item) != -1) show(str0, str1)
                })
            } else {
                show(str0, str1)
            }
            return this.d(str0, str1)
        }
        function show(str0: string | any[], str1: string) {
            if (Hooks_value_hideJavaLog) return
            console.warn("\n--------------\tCalled Log.d\t--------------")
            console.log("Log.d(\x1b[96m'" + str0 + "','" + str1 + "'\x1b[0m)")
            if (isShowPrintStack) PrintStackTraceJava()
        }
    }

    function logI() {
        const Log = Java.use("android.util.Log")
        Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (str0: string | any[], str1: any) {
            if (filter.length != 0) {
                filter.forEach(function (item) {
                    if (str0.indexOf(item) != -1) show(str0, str1)
                })
            } else {
                show(str0, str1)
            }
            return this.i(str0, str1)
        }
        function show(str0: string | any[], str1: string) {
            if (Hooks_value_hideJavaLog) return
            console.warn("\n--------------\tCalled Log.i\t--------------")
            console.log("Log.i(\x1b[96m'" + str0 + "','" + str1 + "'\x1b[0m)")
            if (isShowPrintStack) PrintStackTraceJava()
        }
    }

    function logE() {
        const Log = Java.use("android.util.Log")
        Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (str0: string | any[], str1: any) {
            if (filter.length != 0) {
                filter.forEach(function (item) {
                    if (str0.indexOf(item) != -1) show(str0, str1)
                })
            } else {
                show(str0, str1)
            }
            return this.e(str0, str1)
        }
        function show(str0: string | any[], str1: string) {
            if (Hooks_value_hideJavaLog) return
            console.warn("\n--------------\tCalled Log.i\t--------------")
            console.log("Log.e(\x1b[96m'" + str0 + "','" + str1 + "'\x1b[0m)")
            if (isShowPrintStack) PrintStackTraceJava()
        }
    }

}

function hookLogcat() {
    Java.perform(function () {
        const Log = Java.use("android.util.Log")

        // Hook the 'd' method (Log.d)
        Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, msg: string) {
            LOGW("[DEBUG] " + tag + ": " + msg)
            PrintStackTraceJava()
            return this.d(tag, msg)
        }

        // Hook the 'i' method (Log.i)
        Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, msg: string) {
            LOGW("[INFO] " + tag + ": " + msg)
            PrintStackTraceJava()
            return this.i(tag, msg)
        }

        // Hook the 'w' method (Log.w)
        Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, msg: string) {
            LOGW("[WARN] " + tag + ": " + msg)
            PrintStackTraceJava()
            return this.w(tag, msg)
        }

        // Hook the 'e' method (Log.e)
        Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, msg: string) {
            LOGW("[ERROR] " + tag + ": " + msg)
            PrintStackTraceJava()
            return this.e(tag, msg)
        }
    })
}

function HookNLog(bt: boolean = true) {
    let isFirst = true
    Interceptor.attach(Module.findExportByName(null, "__android_log_print")!, {
        onEnter: function (args) {
            if (Hooks_value_hideJavaLog) return
            if (isFirst) {
                console.log("\n")
                isFirst = false
            }
            console.warn("---------------------------")
            console.log(args[1].readCString() + "\t" + args[2].readCString() + "\t" + args[3] + "\t" + args[4] + "\t" + args[5])
            if (bt) PrintStackTraceNative(this.context)
        }
    })
}

function HookPackageAndSign() {

    showCurrent()
    // hookJava()
    // hookNative()

    function showCurrent() {
        Java.perform(function () {
            const currentApplication = Java.use('android.app.ActivityThread').currentApplication()
            const context = currentApplication.getApplicationContext()
            const packageName = context.getPackageName()
            const PackageManager = context.getPackageManager()
            const PackageInfo = PackageManager.getPackageInfo(packageName, 0x00000040)
            console.error("\n------------------------------------------------------------------")
            console.log("PackageName\t===>\t", packageName)
            console.log("PackageManager\t===>\t", PackageManager)
            console.log("PackageInfo\t===>\t", PackageInfo)
            console.log("versionCode\t===>\t", PackageInfo.versionCode.value)
            console.log("versionName\t===>\t", PackageInfo.versionName.value)
            console.log("signatures\t===>\t", PackageInfo.signatures.value)
            console.error("------------------------------------------------------------------\n")
        })
    }

    function hookJava() {
        Java.perform(function () {
            Java.use("android.content.ContextWrapper").getPackageManager.implementation = function () {
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageManager()")
                PrintStackTraceJava()
                return this.getPackageManager()
            }

            Java.use("android.app.ApplicationPackageManager").getPackageInfo.overload('java.lang.String', 'int').implementation = function (a: string, b: any) {
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageInfo('" + a + "','" + b + "')\t--->\t.overload('java.lang.String', 'int')")
                PrintStackTraceJava()
                return this.getPackageInfo(a, b)
            }

            Java.use("android.app.ApplicationPackageManager").getPackageInfo.overload('android.content.pm.VersionedPackage', 'int').implementation = function (a: any, b: any) {
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageInfo('" + a + "','" + b + "')\t--->\t.overload('android.content.pm.VersionedPackage', 'int')")
                PrintStackTraceJava()
                return this.getPackageInfo(a, b)
            }
        })
    }

    function hookNative() {
        Java.perform(function () {
            const pSize = Process.pointerSize
            const env = Java.vm.getEnv()

            const filter = ['getPackageName', 'getPackageInfo', 'getPackageManager', 'Sign', 'hashCode']
            //https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#NewStringUTF
            const GetStaticMethodID = 113, GetFieldID = 94, GetMethodID = 33

            function getNativeAddress(idx: number) {
                return env.handle.readPointer().add(idx * pSize).readPointer()
            }

            //TODO .........

            hook_GetFieldID()

            hook_GetMethodID()

            function hook_GetMethodID() {
                Interceptor.attach(getNativeAddress(GetMethodID), {
                    onEnter: function (args) {
                        const ctx = this.context
                        filter.forEach(function (value, index, array) {
                            if (value.indexOf(args[2].readCString()!) != -1 || value.indexOf(args[3].readCString()!) != -1) {
                                console.error("\n-------------GetMethodID-------------")
                                console.warn("env\t--->\t" + args[0])
                                console.warn("jclass\t--->\t" + args[1])
                                console.warn("name\t--->\t" + args[2].readCString())
                                console.warn("sign\t--->\t" + args[3].readCString())
                                PrintStackTraceNative(ctx)
                            }
                        })
                    },
                    onLeave: function (retval) { }
                })
            }

            function hook_GetFieldID() {
                Interceptor.attach(getNativeAddress(GetFieldID), {
                    onEnter: function (args) {
                        const ctx = this.context
                        filter.forEach(function (value, index, array) {
                            // if (value.indexOf(args[2].readCString())!=-1||value.indexOf(args[3].readCString())!=-1){
                            console.error("\n-------------GetFieldID-------------")
                            console.warn("env\t--->\t" + args[0])
                            console.warn("jclass\t--->\t" + args[1])
                            console.warn("name\t--->\t" + args[2].readCString())
                            console.warn("sign\t--->\t" + args[3].readCString())
                            PrintStackTraceNative(ctx)
                            // }
                        })
                    },
                    onLeave: function (retval) { }
                })
            }
        })
    }
}

function HookJSONObject(bt: boolean = true) {
    Java.perform(function () {
        Java.use('org.json.JSONObject').getString.implementation = function (key: string) {
            const ret = this.getString(key)
            if (Hooks_value_hideJavaLog) return ret
            LOG("\n--------------------------------------\n" + key, LogColor.COLOR_36)
            LOG(ret, LogColor.COLOR_36)
            if (bt) PrintStackTraceJava()
            return ret
        }
    })
}

function hookSSL() {
    Java.perform(function () {
        // Attempts to bypass SSL pinning implementations in a number of
        // ways. These include implementing a new TrustManager that will
        // accept any SSL certificate, overriding OkHTTP v3 check()
        // method etc.
        var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager')
        var HostnameVerifier = Java.use('javax.net.ssl.HostnameVerifier')
        var SSLContext = Java.use('javax.net.ssl.SSLContext')
        var quiet_output = false

        // Helper method to honor the quiet flag.
        function quiet_send(data: string) {
            console.log(data)
            // if (quiet_output) {
            //     return
            // }
            // send(data)
        }


        // Implement a new TrustManager
        // ref: https://gist.github.com/oleavr/3ca67a173ff7d207c6b8c3b0ca65a9d8
        // Java.registerClass() is only supported on ART for now(201803). 所以android 4.4以下不兼容,4.4要切换成ART使用.
        /*
    06-07 16:15:38.541 27021-27073/mi.sslpinningdemo W/System.err: java.lang.IllegalArgumentException: Required method checkServerTrusted(X509Certificate[], String, String, String) missing
    06-07 16:15:38.542 27021-27073/mi.sslpinningdemo W/System.err:     at android.net.http.X509TrustManagerExtensions.<init>(X509TrustManagerExtensions.java:73)
            at mi.ssl.MiPinningTrustManger.<init>(MiPinningTrustManger.java:61)
    06-07 16:15:38.543 27021-27073/mi.sslpinningdemo W/System.err:     at mi.sslpinningdemo.OkHttpUtil.getSecPinningClient(OkHttpUtil.java:112)
            at mi.sslpinningdemo.OkHttpUtil.get(OkHttpUtil.java:62)
            at mi.sslpinningdemo.MainActivity$1$1.run(MainActivity.java:36)
    */
        var X509Certificate = Java.use("java.security.cert.X509Certificate")
        var TrustManager: Java.Wrapper
        try {
            TrustManager = Java.registerClass({
                name: 'org.wooyun.TrustManager',
                implements: [X509TrustManager],
                methods: {
                    checkClientTrusted: function (chain, authType) { },
                    checkServerTrusted: function (chain, authType) { },
                    getAcceptedIssuers: function () {
                        // var certs = [X509Certificate.$new()]
                        // return certs
                        return []
                    }
                }
            })
        } catch (e: any) {
            quiet_send("registerClass from X509TrustManager >>>>>>>> " + e.message)
        }

        // Prepare the TrustManagers array to pass to SSLContext.init()
        var TrustManagers = [TrustManager!.$new()]

        try {
            // Prepare a Empty SSLFactory
            var TLS_SSLContext = SSLContext.getInstance("TLS")
            TLS_SSLContext.init(null, TrustManagers, null)
            var EmptySSLFactory = TLS_SSLContext.getSocketFactory()
        } catch (e: any) {
            quiet_send(e.message)
        }

        send('Custom, Empty TrustManager ready')

        // Get a handle on the init() on the SSLContext class
        var SSLContext_init = SSLContext.init.overload(
            '[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom');

        // Override the init method, specifying our new TrustManager
        SSLContext_init.implementation = function (keyManager: any, trustManager: any, secureRandom: any) {

            quiet_send('Overriding SSLContext.init() with the custom TrustManager')

            PrintStackTraceJava()

            SSLContext_init.call(this, null, TrustManagers, null)
        }

        /*** okhttp3.x unpinning ***/

        // Wrap the logic in a try/catch as not all applications will have
        // okhttp as part of the app.
        try {

            var CertificatePinner = Java.use('okhttp3.CertificatePinner')

            quiet_send('OkHTTP 3.x Found')

            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {

                quiet_send('OkHTTP 3.x check() called. Not throwing an exception.')
            }

        } catch (err: any) {

            // If we dont have a ClassNotFoundException exception, raise the
            // problem encountered.
            if (err.message.indexOf('ClassNotFoundException') === 0) {

                throw new Error(err)
            }
        }

        // Appcelerator Titanium PinningTrustManager

        // Wrap the logic in a try/catch as not all applications will have
        // appcelerator as part of the app.
        try {

            var PinningTrustManager = Java.use('appcelerator.https.PinningTrustManager')

            send('Appcelerator Titanium Found')

            PinningTrustManager.checkServerTrusted.implementation = function () {

                quiet_send('Appcelerator checkServerTrusted() called. Not throwing an exception.')
            }

        } catch (err: any) {

            // If we dont have a ClassNotFoundException exception, raise the
            // problem encountered.
            if (err.message.indexOf('ClassNotFoundException') === 0) {

                throw new Error(err)
            }
        }

        /*** okhttp unpinning ***/

        try {
            var OkHttpClient = Java.use("com.squareup.okhttp.OkHttpClient")
            OkHttpClient.setCertificatePinner.implementation = function (certificatePinner: any) {
                // do nothing
                quiet_send("OkHttpClient.setCertificatePinner Called!")
                return this
            }

            // Invalidate the certificate pinnet checks (if "setCertificatePinner" was called before the previous invalidation)
            var CertificatePinner = Java.use("com.squareup.okhttp.CertificatePinner")
            CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate').implementation = function (p0: any, p1: any) {
                // do nothing
                quiet_send("okhttp Called! [Certificate]")
                return
            }
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function (p0: any, p1: any) {
                // do nothing
                quiet_send("okhttp Called! [List]")
                return
            }
        } catch (e) {
            quiet_send("com.squareup.okhttp not found")
        }

        /*** WebView Hooks ***/

        /* frameworks/base/core/java/android/webkit/WebViewClient.java */
        /* public void onReceivedSslError(Webview, SslErrorHandler, SslError) */
        var WebViewClient = Java.use("android.webkit.WebViewClient")

        WebViewClient.onReceivedSslError.implementation = function (webView: any, sslErrorHandler: { proceed: () => void }, sslError: any) {
            quiet_send("WebViewClient onReceivedSslError invoke")
            //执行proceed方法
            sslErrorHandler.proceed()
            return
        }

        WebViewClient.onReceivedError.overload('android.webkit.WebView', 'int', 'java.lang.String', 'java.lang.String').implementation = function (a: any, b: any, c: any, d: any) {
            quiet_send("WebViewClient onReceivedError invoked")
            return
        }

        WebViewClient.onReceivedError.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError').implementation = function () {
            quiet_send("WebViewClient onReceivedError invoked")
            return
        }

        /*** JSSE Hooks ***/

        /* libcore/luni/src/main/java/javax/net/ssl/TrustManagerFactory.java */
        /* public final TrustManager[] getTrustManager() */
        /* TrustManagerFactory.getTrustManagers maybe cause X509TrustManagerExtensions error  */
        // var TrustManagerFactory = Java.use("javax.net.ssl.TrustManagerFactory")
        // TrustManagerFactory.getTrustManagers.implementation = function(){
        //     quiet_send("TrustManagerFactory getTrustManagers invoked")
        //     return TrustManagers
        // }

        var HttpsURLConnection = Java.use("javax.net.ssl.HttpsURLConnection")
        /* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
        /* public void setDefaultHostnameVerifier(HostnameVerifier) */
        HttpsURLConnection.setDefaultHostnameVerifier.implementation = function (hostnameVerifier: any) {
            quiet_send("HttpsURLConnection.setDefaultHostnameVerifier invoked")
            return null
        }
        /* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
        /* public void setSSLSocketFactory(SSLSocketFactory) */
        HttpsURLConnection.setSSLSocketFactory.implementation = function (SSLSocketFactory: any) {
            quiet_send("HttpsURLConnection.setSSLSocketFactory invoked")
            return null
        }
        /* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
        /* public void setHostnameVerifier(HostnameVerifier) */
        HttpsURLConnection.setHostnameVerifier.implementation = function (hostnameVerifier: any) {
            quiet_send("HttpsURLConnection.setHostnameVerifier invoked")
            return null
        }

        /*** Xutils3.x hooks ***/
        //Implement a new HostnameVerifier
        var TrustHostnameVerifier: Java.Wrapper<{}>
        try {
            TrustHostnameVerifier = Java.registerClass({
                name: 'org.wooyun.TrustHostnameVerifier',
                implements: [HostnameVerifier],
                methods: {
                    verify: function (hostname: any, session: any) {
                        return true
                    }
                }
            })

        } catch (e) {
            //java.lang.ClassNotFoundException: Didn't find class "org.wooyun.TrustHostnameVerifier"
            quiet_send("registerClass from hostnameVerifier >>>>>>>> " + (e as any).message)
        }
        try {
            var RequestParams = Java.use('org.xutils.http.RequestParams')
            RequestParams.setSslSocketFactory.implementation = function (sslSocketFactory: any) {
                sslSocketFactory = EmptySSLFactory
                return null
            }
            RequestParams.setHostnameVerifier.implementation = function (hostnameVerifier: any) {
                hostnameVerifier = TrustHostnameVerifier.$new()
                return null
            }
        } catch (e) {
            quiet_send("Xutils hooks not Found")
        }
        /*** httpclientandroidlib Hooks ***/
        try {
            var AbstractVerifier = Java.use("ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier")
            AbstractVerifier.verify.overload('java.lang.String', '[Ljava.lang.String', '[Ljava.lang.String', 'boolean').implementation = function () {
                quiet_send("httpclientandroidlib Hooks")
                return null
            }
        } catch (e) {
            quiet_send("httpclientandroidlib Hooks not found")
        }
        /***
    android 7.0+ network_security_config TrustManagerImpl hook
    apache httpclient partly
    ***/
        var TrustManagerImpl = Java.use("com.android.org.conscrypt.TrustManagerImpl")
        // try {
        //     var Arrays = Java.use("java.util.Arrays")
        //     //apache http client pinning maybe baypass
        //     //https://github.com/google/conscrypt/blob/c88f9f55a523f128f0e4dace76a34724bfa1e88c/platform/src/main/java/org/conscrypt/TrustManagerImpl.java#471
        //     TrustManagerImpl.checkTrusted.implementation = function (chain, authType, session, parameters, authType) {
        //         quiet_send("TrustManagerImpl checkTrusted called")
        //         //Generics currently result in java.lang.Object
        //         return Arrays.asList(chain)
        //     }
        //
        // } catch (e) {
        //     quiet_send("TrustManagerImpl checkTrusted nout found")
        // }
        try {
            // Android 7+ TrustManagerImpl
            TrustManagerImpl.verifyChain.implementation = function (untrustedChain: any, trustAnchorChain: any, host: any, clientAuth: any, ocspData: any, tlsSctData: any) {
                quiet_send("TrustManagerImpl verifyChain called")
                // Skip all the logic and just return the chain again :P
                //https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2017/november/bypassing-androids-network-security-configuration/
                // https://github.com/google/conscrypt/blob/c88f9f55a523f128f0e4dace76a34724bfa1e88c/platform/src/main/java/org/conscrypt/TrustManagerImpl.java#L650
                return untrustedChain
            }
        } catch (e) {
            quiet_send("TrustManagerImpl verifyChain nout found below 7.0")
        }
        // OpenSSLSocketImpl
        try {
            var OpenSSLSocketImpl = Java.use('com.android.org.conscrypt.OpenSSLSocketImpl')
            OpenSSLSocketImpl.verifyCertificateChain.implementation = function (_certRefs: any, authMethod: any) {
                quiet_send('OpenSSLSocketImpl.verifyCertificateChain')
            }
            quiet_send('OpenSSLSocketImpl pinning')
        } catch (err) {
            quiet_send('OpenSSLSocketImpl pinner not found')
        }
        // Trustkit
        try {
            var Activity = Java.use("com.datatheorem.android.trustkit.pinning.OkHostnameVerifier")
            Activity.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function (str: string) {
                quiet_send('Trustkit.verify1: ' + str)
                return true
            }
            Activity.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function (str: string) {
                quiet_send('Trustkit.verify2: ' + str)
                return true
            }
            quiet_send('Trustkit pinning')
        } catch (err) {
            quiet_send('Trustkit pinner not found')
        }
        try {
            //cronet pinner hook
            //weibo don't invoke

            var netBuilder = Java.use("org.chromium.net.CronetEngine$Builder")

            //https://developer.android.com/guide/topics/connectivity/cronet/reference/org/chromium/net/CronetEngine.Builder.html#enablePublicKeyPinningBypassForLocalTrustAnchors(boolean)
            netBuilder.enablePublicKeyPinningBypassForLocalTrustAnchors.implementation = function (arg: string) {

                //weibo not invoke
                console.log("Enables or disables public key pinning bypass for local trust anchors = " + arg)

                //true to enable the bypass, false to disable.
                var ret = netBuilder.enablePublicKeyPinningBypassForLocalTrustAnchors.call(this, true)
                return ret
            }

            netBuilder.addPublicKeyPins.implementation = function (hostName: string, pinsSha256: any, includeSubdomains: any, expirationDate: any) {
                console.log("cronet addPublicKeyPins hostName = " + hostName)

                //var ret = netBuilder.addPublicKeyPins.call(this,hostName, pinsSha256,includeSubdomains, expirationDate)
                //this 是调用 addPublicKeyPins 前的对象吗? Yes,CronetEngine.Builder
                return this
            }

        } catch (err) {
            console.log('[-] Cronet pinner not found')
        }
    })
}

export function HookJavaExit(bt: boolean = true) {
    Java.perform(function () {
        try {
            Java.use("android.app.Activity").finish.overload().implementation = function () {
                LOGD(`called android.app.Activity.Finish ${this}`)
                if (bt) PrintStackTraceJava()
            }
            LOGW(`Hook android.app.Activity.finish`)
        } catch (error) {
            LOGE(`ERROR Hook android.app.Activity.finish`)
        }

        try {
            // android.app.Activity => public void finishAffinity()
            Java.perform(() => {
                Java.use("android.app.Activity").finishAffinity.implementation = function () {
                    LOGD(`called finishAffinity ${this}`)
                    if (bt) PrintStackTraceJava()
                    // this.finishAffinity()
                }
            })
            LOGW(`Hook android.app.Activity.finishAffinity`)
        } catch (error) {
            LOGE(`ERROR Hook android.app.Activity.finishAffinity`)
        }

        try {
            Java.use("java.lang.System").exit.implementation = function (code: number) {
                LOGD("called java.lang.System.exit(" + code + ")")
                if (bt) PrintStackTraceJava()
            }
            LOGW(`Hook java.lang.System.exit`)
        } catch (error) {
            LOGE(`ERROR Hook java.lang.System.exit`)
        }
    })
}

const HookExit = (bt: boolean = true) => {

    LOGE(`CURRENT PID : ${Process.id}`)

    HookJavaExit(bt)

    // [*] function -> address: 0x7de78d6460 ( 0x7b460 )  quick_exit
    //     quick_exit
    //     [-] MD_Base: 0x7de785b000 | size: 0x61e000         <-  module:  libc.so
    //     [-] RG_Base: 0x7de78ba000 | size: 0x3d000          <-  range:   r-x
    try {
        Interceptor.replace(Module.findExportByName("libc.so", "quick_exit")!, new NativeCallback(function (status: number) {
            LOGE(`called libc.so::quick_exit(${status})`)
            PrintStackTraceNative(this.context)
            return 0
        }, 'int', ['int']))
        LOGW(`Hook libc.so::quick_exit @ ${Module.findExportByName("libc.so", "quick_exit")!}`)
    } catch (error) {
        LOGE(`ERROR Hook libc.so::quick_exit @ ${Module.findExportByName("libc.so", "quick_exit")!}`)
    }

    // [*] function -> address: 0x7de78f94d0 ( 0x9e4d0 )  _exit
    //                                                _exit
    //     [-] MD_Base: 0x7de785b000 | size: 0x61e000         <-  module:  libc.so
    //     [-] RG_Base: 0x7de78f7000 | size: 0x3000           <-  range:   rwx
    try {
        Interceptor.replace(Module.findExportByName("libc.so", "_exit")!, new NativeCallback(function (status: number) {
            LOGE(`called libc.so::_exit(${status})`)
            PrintStackTraceNative(this.context)
            return 0
        }, 'int', ['int']))
        LOGW(`Hook libc.so::_exit @ ${Module.findExportByName("libc.so", "_exit")!}`)
    } catch (error) {
        LOGE(`ERROR Hook libc.so::_exit @ ${Module.findExportByName("libc.so", "_exit")!}`)
    }

    // System.exit(0)
    try {
        Interceptor.replace(Module.findExportByName("libopenjdk.so", "Runtime_nativeExit")!, new NativeCallback(function (lenv, lcls, status) {
            LOGE(`called libopenjdk.so::_exit(${lenv}, ${lcls}, ${status})`)
            Java.perform(() => {
                let env = Java.vm.tryGetEnv()
                let cls = Java.cast(lcls, Java.use("java.lang.Class"))
                LOGD(`env => ${JSON.stringify(env)} | ${cls}`)
            })
            LOGW(`env => ${lenv} | ${lcls} |status => ${status}`)
            PrintStackTraceNative(this.context)
            return 0
        }, 'int', ['pointer', 'pointer', 'pointer']))
        LOGW(`Hook libopenjdk.so::_exit @ ${Module.findExportByName("libopenjdk.so", "Runtime_nativeExit")!}`)
    } catch (error) {
        LOGE(`ERROR Hook libopenjdk.so::_exit @ ${Module.findExportByName("libopenjdk.so", "Runtime_nativeExit")!}`)
    }

    // android.os.Process.killProcess(android.os.Process.myPid())
    // void android_os_Process_sendSignal(JNIEnv* env, jobject clazz, jint pid, jint sig)
    try {
        let android_os_Process_sendSignal_addr = Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")!
        Interceptor.replace(android_os_Process_sendSignal_addr, new NativeCallback(function (lenv, lcls, pid, sig) {
            LOGW(`called android.os.Process.sendSignal(${pid}, ${sig})`)
            PrintStackTraceNative(this.context)
            Java.perform(() => {
                let env = Java.vm.tryGetEnv()
                let cls = Java.cast(lcls, Java.use("java.lang.Object"))
                LOGD(`env => ${JSON.stringify(env)} | ${cls}`)
                PrintStackTraceJava()
            })
            LOGW(`env => ${lenv} | ${lcls} | pid => ${pid} | sig => ${sig}`)
        }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']))
        LOGW(`Hook libandroid_runtime.so::Process_sendSignal @ ${Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")!}`)
    } catch (error) {
        LOGE(`ERROR Hook libandroid_runtime.so::Process_sendSignal @ ${Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")!}`)
    }

    // void kill(pid_t pid, int sig)
    try {
        const kill_addr = Module.findExportByName("libc.so", "kill")!
        Interceptor.replace(kill_addr, new NativeCallback(function (pid, sig) {
            LOGE(`called libc.so::kill(${pid}, ${sig})`)
            try {
                LOGZ(`\t[ ${getThreadName(pid)} ]`)
            } catch (error) {
                // ...
            }
            PrintStackTraceNative(this.context)
            // raise(SIGNAL.SIGTRAP)
            return 0
        }, 'int', ['int', 'int']))
        LOGW(`Hook libc.so::kill @ ${Module.findExportByName("libc.so", "kill")!}`)
    } catch (error) {
        LOGE(`ERROR Hook libc.so::kill @ ${Module.findExportByName("libc.so", "kill")!}`)
    }

    // abort
    try {
        const abort_addr = Module.findExportByName("libc.so", "abort")!
        Interceptor.replace(abort_addr, new NativeCallback(function () {
            LOGE(`called libc.so::abort()`)
            PrintStackTraceNative(this.context)
            return 0
        }, 'void', []))
        LOGW(`Hook libc.so::abort @ ${Module.findExportByName("libc.so", "abort")!}`)
    } catch {
        LOGE(`ERROR Hook libc.so::abort @ ${Module.findExportByName("libc.so", "abort")!}`)
    }

    Il2Cpp.perform(() => {
        try {
            // UnityEngine.CoreModule UnityEngine.Application Quit(Int32) : Void
            R(Il2Cpp.Domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit", 1).virtualAddress, (_srcCall: Function, arg0: NativePointer) => {
                // srcCall(arg0, arg1, arg2, arg3)
                LOGE("called UnityEngine.Application.Quit(" + arg0.toInt32() + ")")
                return ptr(0)
            })
            LOGW(`Hook UnityEngine.Application.Quit(Int32) @ ${Il2Cpp.Domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit", 1).virtualAddress}`)
        } catch (error) {
            LOGE(`ERROR Hook UnityEngine.Application.Quit(Int32)`)
        }

        try {
            // UnityEngine.CoreModule UnityEngine.Application Quit() : Void
            R(Il2Cpp.Domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit").virtualAddress, (_srcCall: Function) => {
                // srcCall(arg0, arg1, arg2, arg3)
                LOGE("called UnityEngine.Application.Quit()")
                return ptr(0)
            })
            LOGW(`Hook UnityEngine.Application.Quit() @ ${Il2Cpp.Domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit").virtualAddress}`)
        } catch (error) {
            LOGE(`ERROR Hook UnityEngine.Application.Quit()`)
        }
    })
}

declare global {
    var HookJavaReflect: (bt?: boolean) => void
    var HookJavaSharedPreferences: (bt?: boolean) => void
    var HookJavaIntent: (bt?: boolean) => void
    var HookExit: () => void
    var HookJavaExit: (bt?: boolean) => void
    var HookJavaStartActivity: (bt?: boolean) => void
    var HookToast: (bt?: boolean) => void
    var HookLog: (bt?: boolean) => void
    var hookLogcat: () => void
    var HookNLog: (bt?: boolean) => void
    var HookPackageAndSign: () => void
    var HookJSONObject: (bt?: boolean) => void
    var hookSSL: () => void

    var hideJavaLog: (flag?: boolean) => void
}

globalThis.HookJavaReflect = HookReflect
globalThis.HookJavaSharedPreferences = HookSharedPreferences
globalThis.HookJavaIntent = HookIntent
globalThis.HookJavaExit = HookJavaExit
globalThis.HookExit = HookExit
globalThis.HookJavaStartActivity = HookStartActivity
globalThis.HookToast = HookJavaToast
globalThis.HookLog = HookLog
globalThis.hookLogcat = hookLogcat
globalThis.HookNLog = HookNLog
globalThis.HookPackageAndSign = HookPackageAndSign
globalThis.HookJSONObject = HookJSONObject
globalThis.hookSSL = hookSSL

export var Hooks_value_hideJavaLog: boolean = false

globalThis.hideJavaLog = function (flag: boolean = true) {
    Hooks_value_hideJavaLog = flag
    HookIntent()
}

