
> 以下内容讨论如何用js的方式实现用户点击`<a target="_blank">`的效果：在浏览器的新标签页打开指定页面，且不被浏览器屏蔽。

通常情况下，如果希望用户在新标签页打开一个链接，a标签是最合理的方案。

## js中的实现

如果是希望用js代码的方式打开新标签页，常规方法有两个：
- `window.open`
- `querySelector('a').click()`

直接执行这两行js，大多数浏览器会将新开页面屏蔽掉，并提示用户。这样做是为了防止恶意的js代码打开大量用户不希望看到的链接地址，并进一步引发更严重的后果。

但是当这两行代码出现在`click`和`dblclick`以及`mousedown\up\leave\enter`事件中时，浏览器认为这一行为是用户行为，不会进行屏蔽，允许直接打开：

````
  <button id="btnA">btn1</button>
  <script>
    $(function(){
      $('#btnA').click(function(){
        window.open('http://www.baidu.com', {target:'_blank'});
      });
    });
  </script>
````

在事件中执行的时候，浏览器不会屏蔽，仅限于该事件是由用户触发的。如果是**js去触发该事件**，弹框就会被拦截：
````
  <button id="btnA">btn1</button>
  <script>
    $(function(){
      $('#btnA').click(function(){
        window.open('http://www.baidu.com', {target:'_blank'});
      });
      $('#btnA')[0].click();
    });
  </script>
````

> 此外，如果在事件中，使用到异步请求，那么在异步请求中去调用`window.open`，一样会被拦截。

***结论***：非用户鼠标触发事件中，浏览器都会拦截`window.open`。

## 鼠标事件中异步情况

如果在`click`事件打开页面之前，需要异步请求服务器获取信息，`window.open`也会被拦截：
````
  <button id="btnB">btn2</button>
  <script>
    $('#btnB').click(function(){
      $.ajax('./index.json').success(function(){
        window.open('http://www.baidu.com', {target:'_blank'});
      });
    });
  </script>
````

这种情况下，可以用下面的方式去规避：
1. click事件中，先同步用`window.open`打开一个空标签页
2. 在异步请求回来之后，修改那个空标签页的href为希望打开的页面地址

````
$('#btnB').click(function(){
  var win = window.open('', {target:'_blank'});
  $.ajax('./index.json').success(function(){
    win.location.href = 'http://www.baidu.com'
  });
});
````

## setTimeout规避异步

上面的解决方案先打开了一个空白的标签页。  
那如果业务逻辑是根据异步请求的返回情况，可能打开标签页，也可能是不打开而是执行其他操作，上面的方法就不太好用了。  

这里提供一个折中的方案：利用`setTimeout`

先看一下`setTimeout`下`window.open`的执行结果：

````
$('#btnA').click(function(){
  setTimeout(function(){
    window.open('http://www.baidu.com', {target:'_blank'});
  }, 0);
});
````
在chrome和firefox下，浏览器都不会拦截，IE则会进行拦截。

当tiemout时间在1000毫秒以内，chrome和firefox都会放行，大于1000毫秒，则都会被拦截。

所以可以利用这个特性，在chrome、firefox上实现异步请求之后，判断是否打开新窗口：

````
$('#btnB').click(function(){
  var a = false;
  setTimeout(function(){
    if(a) {
      window.open('http://www.baidu.com', {target:'_blank'});
    }
  }, 300);

  $.ajax('./index.json').success(function(data){
    a = data.a;
  });
});
````

可以通过多个setTimeout来设立合理的执行时间间隔，尽快响应异步的返回请求。
