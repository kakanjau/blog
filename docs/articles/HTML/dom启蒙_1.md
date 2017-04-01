### 文档节点

- `document.activeElement` 取得文档中聚焦、激活状态的元素引用
- `document.hasFocus()` 判断文档或文档中的任何节点得到焦点
- `document.defaultView` 获取当前环境的顶部/全局对象(在浏览器环境中即是window对象)

### 元素节点

-  节点操作

  > 最一致的获取、设置、移除元素的属性值的方式就是`getAttribute()`、`setAttribute()`、  `removeAttribute()`方法。
  > 判断一个元素是否有某个属性的最好方式是用`hasAttribute()`方法。

- 类属性操作
 - `elm.classList` *获取类属性值类数组列表（IE9及以下不支持）*
 - `classList.add()` 、`classList.remove()`、`classList.toggle()` *增加、删除、切换类属性*
 - `classList.contains()` *判断类属性值是否包含某一特定类*

- data-*属性

 > 利用元素的dataset属性对象，可以获取该元素中所有以`data-*`起始的属性。并可以直接修改该属性

### 视口偏移量

#### 文档坐标位置和视口坐标位置
文档：当前页面完整的document  
视口：当前浏览器的可视部分  

页面未出现滚动条的情况下，文档位置 = 视口位置。  
文档内容超过一屏且滚动条向下滚动，文档位置 \> 视口位置。  
此时，获取视口相对于文档的偏移量（滚动条位置），对于计算元素的位置关系，以及确认元素是否在视口内都是很有必要的。

#### 获取视口偏移量

- 现代浏览器：`window.pageYOffset/pageXOffset`
- IE浏览器：
    + IE6及以上：`document.documentElement.scrollTop/scrollLeft`
    + IE5及怪异模式：`document.body.scrollTop/scrollLeft`
- jquery实现：
  jquery通过 scrollTop/scrollLeft()获取  
  最新版本的jquery已经不再考虑IE5。所以在IE5下用jquery的scrollTop()获取的值是0
  ````javascript
    win ? ('pageYOffset' in win) ? win[ 'pageYOffset' ] :
        win.document.documentElement[ 'scrollTop' ] :
          elem[ 'scrollTop' ]
  ````

### 定位元素位置

#### 元素视口位置
所有现代浏览器、IE7及以上浏览器的DOM对象都提供`getBoundingClientRect()`方法，返回元素相对于视口的left、top、bottom、right、width、height信息
> width、height包含边框和内边距，但不包含外边距
> 该方法返回的对象仅代表调用时元素的视觉状态

#### 元素文档位置
DOM对象并没有提供原生的获取相对于文档位置的方法。有两种方法获取该位置：  

- 通过视口偏移量+元素视口位置
- 通过元素的offsetTop/offsetLeft属性

> offsetTop返回的并不一定是文档位置，它返回的是相对于已定位位置祖先元素的位置。通过元素的offsetParent来获取元素的已定位祖先元素。如果offsetParent为null，则说明该元素的offsetTop是相对于文档的位置。
> 此时需要循环获取目标元素的offsetParent，叠加计算top和left值，最终算出相对于文档的top和left

#### DOM对象的元素尺寸属性
DOM对象一共提供了13个有关尺寸的属性：

- `offsetWidth`、`offsetHeight`、`offsetLeft`、`offsetTop`、`offsetParent`
- `clientHeight`、`clientWidth`、`clientLeft`、`clientTop`
- `scrollWidth`、`scrollHeight`、`scrollLeft`、`scrollTop`

由于DOM元素都可设置overflow，出现实际内容大于可视盒子模型。client和scroll分别提供了这两种的尺寸信息。
`clientWidth`、`clientHeight`属性提供元素可视范围内的宽高（包含内边距不包含边框）。
`scrollWidth`、`scrollHeight`属性提供元素实际内容的宽高（包含内边距不包含边框）。
`scrollLeft`、`scrollTop`是一个get/set属性，获取或设置滚动条的位置

#### jquery的位置方法
jquery提供了比较丰富的方法获取DOM对象尺寸、位置信息：  

- height()：获取、设置元素高度
- innerHeight()：获取元素高度（包括padding、不包括border）
- outerHeight()：获取元素高度（包括padding、border、选择性的margin）
- width()：获取、设置元素宽度
- innerWidth()：获取元素宽度（包括padding、不包括border）
- outerWidth()：获取元素宽度（包括padding、border、选择性的margin）
- offset()：获取、设置元素相对于文档的坐标位置，返回{left: , top: }
- position()：获取元素相对于已定位位置的祖先元素的位置信息，返回{left: , top: }
- scrollLeft()：获取、设置水平滚动条的位置
- scrollTop()：获取、设置垂直滚动条的位置

### 元素节点内联样式

> 每个HTML元素都有一个style属性，可以用来编辑针对该元素的内联样式。
>  `var eleStyle = document.querySelect('selector').style` 获取元素的内联样式CSSStyleDeclaration 

- 获取、设置、移除单个内联样式  
 - 直接对`eleStyle`进行对象属性的访问和赋值
 - `eleStyle`也提供了setPropertyVallue()、getPropertyValue()、removeProperty()方法来操作内联样式

- 获取、设置、移除所有内联样式
 - 使用CSSStyleDeclaration对象的cssText属性覆盖该元素的内联样式：`eleStyle.cssText = "border:1px solid black;";`、`eleStyle.cssText = "";`
 - 使用元素对象的setAttribute()、getAttribute()、removeAttribute()方法：`ele.setAttribute('style', 'border:1px solid black;')`

- 使用`window.getComputedStyle()`获取元素的已计算样式