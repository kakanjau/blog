> 上个月为公司的app应用做了一个天气信息的html小页面。为了保证app在断网访问时，天气部分不会显示空白，使用了html5的应用缓存(Application Cache)。

Application Cache是HTML5的新特性，可以将资源文件缓存在本地，当设备离线时，网站仍然可以被使用。

###HTML5 Application Cache实例###

使用Application Cache需要以下配置：

1. 在html头中进行声明：`<html manifest="demo.appcache">`
2. 在根目录下有*demo.appcache*文件
3. web服务器支持application cache的MIME-TYPE: 'text/cache-manifest'

> nginx服务器修改MINI-TYPE的方法是修改*/conf/mime.types*文件，在结尾`}`前新加一行：`text/cache-manifest mf manifest appcache;`

###Manifest文件###

manifest文件可分为三部分：

- CACHE MANIFEST：在此标题下列出的文件将在首次下载后进行缓存
- NETWORK：在此标题下列出的文件需要与服务器的连接，且不会被缓存
- FALLBACK：在此标题下列出的文件规定当页面无法访问时的回退页面(比如404页面)

一个完整的Manifest文件

CACHE MANIFEST
# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js

NETWORK:
login.asp

FALLBACK:
/html5/ /404.html

####缓存更新####

一旦应用资源被缓存，它就会保持缓存直到发生下列情况：

- 用户清空浏览器缓存
- manifest文件被修改
- 由程序来更新应用缓存