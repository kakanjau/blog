> media queries直译即媒体查询。用在html的`<link>`标签或CSS式样内，通过判断媒体类别或特征属性来使对应的CSS生效。
> 该标准的W3官网：[http://www.w3.org/TR/css3-mediaqueries/](http://www.w3.org/TR/css3-mediaqueries/)

### 使用方法
常见的使用方式如下：

`<link rel="stylesheet" media="screen and (max-width: 400px)" href="small.css" />`

@media screen and (max-width: 400px) {
span {
width: 100%;
}
}

screen是媒体类型，目前浏览器仅支持`screen`(屏幕式样)、`pring`(打印式样)、`all`。

后面则通过 `and`、`only`、`not`、`,`条件判断，判断内容。

### Media features

> Media queries提供了以下特征条件来进行判断
> 绝大多数特征条件都提供`min-`和`max-`来表示**大于等于**和**小于等于**
>

- width
- 描述输出设备目标显示区域的视口(viewport)宽度
- `@media screen and (min-width: 400px) and (max-width: 700px){...}`
- height
- 同`width`
- device-width
- 描述输出设备本身的宽度
- `@media screen and (min-device-width: 800px) {...}`
- device-height
- 同`device-width`
- orientation
- 描述显示的方向。值`portrait`(纵向)表示高度大于等于宽度，值`landscape`(横向)表示宽度大于高度
- `@media all and (orientation:portrait) {...}`
- `@media all and (orientation:landscape) {...}`
- aspect-ratio
- 描述显示区域纵横比
- device-aspect-ratio
- 描述输出设备屏幕纵横比
- `@media screen and (device-aspect-ratio: 16/9) {...}`
- `@media screen and (device-aspect-ratio: 1280/720) {...}`
- `@media screen and (device-aspect-ratio: 2560/1440) {...}`
- color
- 描述屏幕支持的颜色位数，如果不是彩色设备，则值为0
- `@media all and (color) {...}`
- `@media all and (min-color: 1) {...}`
- color-index
- describes the number of entries in the color lookup table of the output device. If the device does not use a color lookup table, the value is zero.
- `@media all and (color-index) {...}`
- `@media all and (min-color-index: 256) {...}`
- monochrome
- describes the number of bits per pixel in a monochrome frame buffer. If the device is not a monochrome device, the output device value will be 0.
- `@media all and (monochrome) {...}`
- `@media all and (min-monochrome: 1) {...}`
- resolution
- `@media print and (min-resolution: 300dpi) {...}`
- scan
- `@media tv and (scan: progressive) {...}`
- grid
- `@media handheld and (grid) and (max-width: 15em) {...}`