### Il2cppHook

### 基于 frida 的 libil2cpp.so 运行时解析脚本

[![npm license](https://img.shields.io/npm/l/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)
![Build Status](https://github.com/axhlzy/Il2CppHookScripts/actions/workflows/Auto-build.yml/badge.svg)
[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/axhlzy/Il2CppHookScripts)
[![npm version](https://img.shields.io/npm/v/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)
[![npm downloads](https://img.shields.io/npm/dm/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)

#### 功能 

- 解析 Unity 的 方法`m` | 类`c` | 字段`f` | 实例`lfs`/`lfp`
- 解析运行时方法参数 `b` / `bt` | nop 函数 `n` | detachAll 和清理缓存 `D`
- 批量HOOK常用函数 `B/BF/BN`, 修改函数返回值 `setFunctionXXX`, `setActive` 设置游戏对象的活动状态
- 封装 “Interceptor.attach”，使其更易于从命令行使用 `A(ptr,(args)=>{},(ret)=>{})`
- 更方便地查找函数 `findMethods` / `findClasses` 并调用函数 `callFunction` / `findExport` 查找导出函数
- `showMethodInfo` 帮助我们简单地获取 Il2cppMethod* 的详细信息，获取游戏对象的详细信息使用`showGameObject`
- 对象层次结构 `PrintHierarchy` / 类型层次结构 `showTypeParent`
- 用frida和方法信息反汇编`showAsm`，`seeHexA`表示十六进制转储
- `breakWithStack` 为 il2cpp 提供更多符号解析，`breakWithArgs` 只显示 args
- 常用HOOK封装 `HookOnPointerClick` / `HookSetActive` / `B_Button` / `HookPlayerPrefs` ...
- 解析挂载脚本 `showComponents` | `PrintHierarchyWithComponents` 
- JNI RegisterNatives 挂钩（在 JNIHelper 中植入，默认关闭 [不稳定]），使用 JNIHelper.cacheRegisterNativeItem 获取信息 !测试！
- 使用 QBDI 模拟函数的执行，使用 t(methoinfo) 或 traceFunction(mPtr) 启用替换钩子！测试！
- :confused: :confused: :confused:

-------

#### 安装
```sh
$ npm install il2cpp-hooker -g
```

然后你可以像这样使用 ↓

1. frida attch current app
```sh
$ fat

```
2. frida spawn app of ${PackageName}
```sh
$ fat ${PackageName}
```

3. 命令行选项
```sh
$ fat -h

        _ _  ______                        _                 _
        | | |(_____ \                      | |               | |
        | | |  ____) )____ ____  ____ _____| |__   ___   ___ | |  _ _____  ____
        | | | / ____// ___)  _ \|  _ (_____)  _ \ / _ \ / _ \| |_/ ) ___ |/ ___)
        | | || (____( (___| |_| | |_| |    | | | | |_| | |_| |  _ (| ____| |
        |_|_|\______)____)  __/|  __/     |_| |_|\___/ \___/|_| \_)_____)_|
                        |_|   |_|

用法： fat [options] <package-name?>

选项：
  -h, --help 打印使用信息。
  -r, --runtime [engine] 指定 JS 引擎（qjs, v8）。默认：v8
  -t，--timeout [ms] 以毫秒为单位指定调用函数前的时间。
  -f,--functions[名称] 指定启动时要调用的函数，例如：-f getApkInfo()；
  -l, --log [path] 指定保存日志的路径。
  -c，--vscode 使用 vscode 打开项目。
  -v，--版本 打印版本信息。

报告错误：
   axhlzy <axhlzy@live.cn> (https://github.com/axhlzy/Il2CppHookScripts/)

```

-------

[<img src="https://github.com/codespaces/badge.svg" title="Open in Github Codespace">](https://codespaces.new/axhlzy/Il2CppHookScripts)


#### 编译
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/

$ npm install

$ npm run build & npm run compress

$ frida -U -f com.xxx.xxx -l ../_Ufunc.js
或者
$ frida -FU -l ../_Ufunc.js
```

#### 或者是这样使用（未及时更新 且 需要科学上网）
`frida --codeshare axhlzy/il2cpphookscripts -U -f ${PackageName}`

> [!］npm 软件包可能无法及时更新，因此您可以考虑使用 `fat -c` 打开项目
并使用 `github action` [Artifacts](https://github.com/axhlzy/Il2CppHookScripts/actions) 替换 _Ufunc.js 文件 :hushed:

-------

#### API

[更多详情](https://github.com/axhlzy/Il2CppHookScripts/wiki)

或

使用 vscode 打开并搜索 `globalthis.` 以查找更多用法



请作者喝杯咖啡 (^_^)

<img src=https://github.com/axhlzy/Il2CppHookScripts/assets/20512058/618a0674-e5ad-4c0f-9435-f7e133d4b293 width="300" height="400">

<!-- qq:597290673 -->
<!-- wx:axhlzy0922 -->
<!-- tg:axhlzy -->
