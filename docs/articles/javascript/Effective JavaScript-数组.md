> Effective JavaScript 编写高质量javascript代码的68个有效方法
> - 第49条：数组迭代要优先使用for循环而不是for...in循环
> - 第50条：迭代方法优于循环
> - 第51条：1在类数组对象上复用通用的数组方法
> - 第52条：数组字面量优于数组构造函数

这4条是与数组相关的

###49、50

组合起来就是，遍历优先使用迭代方法、然后是循环，强烈不推荐**for...in**

####for...in的坏处
for...in通常用来对对象进行遍历。如下：

    var o = {
         v1: 1,
        v2: 2
    };
    for(var p in o){
         console.info(o[p]);
    }

`for...in`有两点需要注意：①枚举顺序不固定 ②枚举的是属性名，而不是属性值

####循环的特点
for循环是开发人员再熟悉不过的了，几乎所有的开发语言都有for循环，语法也大体一样。但是javascript的for循环，需要注意1点：**数组的长度是可变的**。

运行如下代码：

    var l = [0];
    for(var i=0; i<l.length; i++){
         l.push(i+1);
    }

执行结果：`FATAL ERROR: JS Allocation faild - process out of memory` 
在for循环体执行push后，length会自动+1，导致for循环会一直执行，直到内存溢出。 
代码修改为如下形式：

    var l = [0];
        var length = l.length;
    for(var i=0; i<length; i++){
         l.push(i+1);
    }

则for循环只会执行1次。这样写另外的好处就是，避免每次循环都要重新计算数组的长度

####迭代的方法
ES5中为数组提供了更多的迭代方法：forEach、every、some、map、filter等等，这里不再一一赘述，需要注意的是，由于这些方法是HTML5提出的，各个浏览器的支持性不一样，开发中需要验证浏览器是否包含这些方法。

这里需要说明的是，可以通过闭包的方式，为数组添加新的迭代函数：

     // takeWhile方法：从头遍历数组，找出符合传入函数(pred)条件的元素，
    // 直到遇到第一个不满足条件的元素为止
    Array.prototype.takeWhile = function(pred){
         var result = [];
        for(var i=0, n=this.length; i<n; i++){
             if(!pred(this[i], i)){
                    break;
            }
            result[i] = this[i];
        }
        return reulst;
    };

###51

有些类具备数组的基本特征：
- 具有1个范围在0到2^32-1的整形length属性
- 具有索引，它的字符串表示的是该对象中的一个key

这里最特殊的要属arguments了。arguments作为function的内部属性，提供了通过下标挨个访问参数的功能，但它本身并不是继承自Array.prototype的数组。

    function f(){
         console.info(arguments);
    };
    f('a', 'b', 'c'); // {'0':'a', '1':'b', '2':'c'}
   
     l = ['a', 'b', 'c'];
    console.info(l); // ['a', 'b', 'c']

通过对比可以看到，arguments其实是一个对象，属性为0、1、2...，此时，可以利用arguments属性是0、1、2递增的特点，使用数组的迭代函数进行遍历。

    function f(){
          [].forEach.call(arguments, function(arg){
             console.info(arg);
        });
     };
    f('a', 'b', 'c');
    /*
     a
     b
     c
    */

可以看到，arguments被成功的遍历了。

另外，还可以使用slice方法，将arguments转换为真正的数组

    function f(){
         console.info( [].slice.call(arguments) );
    };
     f('a', 'b', 'c'); // ['a', 'b', 'c']

###52

数组的字面量就是：[]，构造函数则是Array。

我之前一直比较无知的倾向于使用Array类构造数组，觉得文字构造比较直白，其实这是一种错误的思想。 
使用构造函数主要有以下隐患：
- 构造函数可能被覆盖 
  比如有人会写： `Array = String`；
  那之后所有的`new Array`都等同于`new String`了
- 某些行为有歧义 
  `var l = [17]` 和 `var l = new Array(17)`就是不同的含义