> 前一篇[Application Cache](http://www.qiaokaka.com/blog/detail/2/54ab81b9fa8aa39607010b15) 讲了笔者在做移动端嵌入app的天气页面时遇到的缓存问题。其实，这个页面最先遇到的问题是view port问题。
>
> 由于笔者之前没有做过移动web开发，在使用chrome的移动模拟调试器看效果的时候，一下子就傻掉了(不要鄙视我)。完全不知道问题出在哪里的笔者，赶紧求助项目组经验丰富的WD姑凉，姑凉随手发过来1行代码，问题迎刃而解：`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
>
> 当时忙着开发，也没有时间深究这行神奇的代码到底做了什么事情，页面完成后，赶紧去学习了一下，这个viewport信息量还是蛮大的哦。

##浏览器的3个view port

在桌面端开发中，不管布局时候使用栅栏式的响应布局还是固定宽度布局，浏览器都能正常显示内容。但是手机由于宽度比较窄，而屏幕像素密度又比较高，此时去访问桌面端的网站时，所有内容都会变得很小，无法正常浏览。为了解决这个问题，手机浏览器厂商发明了两个viewport：**layout viewport**，**visual viewport**。

- layout viewport是浏览器定义出的布局viewport，通常其width设定的比较宽，这样就能把桌面端网站正常的渲染出来
- visual viewport则是浏览器屏幕可视的viewport，它是手机浏览器或app的webview的正常宽度如320、480等等。

这样，当访问桌面端网站的时候，就通过滑动条来访问网站了。想象一下淘宝商品图片的放大展示效果。

两个viewport虽然解决了手机浏览器显示网站的问题，但是不可避免会出现缩放，使用效果很差。如果网站本身就是针对手机浏览器设计的，不需要缩放，这个时候就需要统一layout viewport和visual viewport，此时就是`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`出场的时候了。

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的layout viewport，也就是说会出现横向滚动条。

在苹果的规范中，meta viewport有6个属性：

- width：设置layout viewport 的宽度，为一个正整数，或字符串"width-device"
- initial-scale：设置页面的初始缩放值，为一个数字，可以带小数
- minimum-scale：允许用户的最小缩放值，为一个数字，可以带小数
- maximum-scale：允许用户的最大缩放值，为一个数字，可以带小数
- height：设置layout viewport 的高度，这个属性对我们并不重要，很少使用
- user-scalable：是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许

使用了meta viewport设置后，layout viewport和visual viewport被统一为1个viewport，也是适合手机屏幕显示的理想的viewport，称之为：**idel viewport**

###css中的px
由于手机屏幕大像素密度越来越高，同时手机浏览器还都支持缩放功能，所以在手机浏览器上，css中的px值是不固定的。
拿iPhone4为例，它的屏幕物理分辨率是640\*960，比前一代的320\*480分辨率，宽、高都提高了1倍，但是屏幕实际宽高却没有变化。此时，iPhone浏览器里默认css的1px相当于2px的物理像素。也就是说1个`<div style="width:320px,height:480px"></div>`会把iPhone4的屏幕铺满。
而Android手机由于屏幕大小、分辨率五花八门，css像素和物理像素的比例更是各不相同。

> 博客园上有一篇文章对viewport进行了非常详细的讲解：[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)
> 笔者就不再班门弄斧了。

###坑###
1. 貌似现在手机浏览器针对`width=100%`这种布局，会默认铺满手机屏幕，而不再是上面提到的使用layout viewport。所以，如果width布局时，最外层使用100%布局的，不用meta viewport也可以
2. 如果是app里使用webview做显示，而同时webview容器本身的宽度小于设备宽度的时候，使用meta viewport的width=device-width时，在iPhone上会出现横向滚动条。