#javascript中的Object
> 在javascript中，一切皆为Object。function、array、String等都继承自Object。 
> 最初级的使用中，就会用到Object的实例化，比如 `new String()` (或者是直接`''`)、`new Array()` (或者是直接`[]`)、`new Object()` (或者是直接`{}`)，都是使用javascript中默认提供的类来实例化对象。也可以通过function来创建自己的类和对象：`function F(){};  f = new F();` 
>  
>   既然有类和对象，就会有继承。javascript本身并不提供直接继承的关键字，如果想要自己实现，则需要对javascript中的function、Object、property等有足够的了解。 
>    
>   诸多javascript的框架都提供了方法来实现object的继承，其中ExtJs框架本身就接近于面向对象的设计思想，因此其提供的extend函数，也是实现类继承比较完善和规范的。 
>  
>   下面以ExtJs的extend方法来解析javascript类继承的实现

#ExtJs的extend
> 理解js的原型链和继承

##extend函数说明
###extend的调用形式
ExtJs的extend函数，有两种调用形式：

- 2个参数的形式：`subclass = Ext.extend(superclass, overrides)`
- 3个参数的形式：`Ext.extend(subclass, superclass, overrides )`

两者的区别在于，2个参数的形式中，subclass会被extend返回内容完全覆盖，而3个参数的形式中，subclass可以保留已有的内容。

###extend的作用
extend的作用，当然是将superclass的属性和方法传递给subclass，并使用overrides里的配置项覆盖掉subclass的内容。但实际上，由于javascript特殊的Object结构，superclass中的属性和方法会由不同的形式反应到subclass中。
来看下面这个例子：

> 下面的代码，可以拷贝后，在加载了ExtJs的网站(比如BOM)中，通过chrome、或firefox的调试器执行。

``` javascript
function superclass(){
    this.superv1 = 'superv1';
    this.superf1 = function(){
        console.info('this is superclass function 1');
    }
}
superclass.prototype.superv2 = 'superv2';
superclass.prototype.superf2 = function(){
    console.info('this is superclass function 2');
}

function subclass(){
    this.subv1 = 'subv1';
    this.subf1 = function(){
        console.info('this is subclass function 1');
    }
    subclass.superclass.constructor.call(this);
}
subclass.prototype.subv2 = 'subv2';
subclass.prototype.subf2 = funcion(){
    console.info('this is subclass function 2');
}

Ext.extend(subclass, superclass, {});
```

然后，我们定义变量：`var sub = new subclass();`，查看sub的属性：

``` javascript
sub.subv1; // subv1
sub.subv2; // subv2
sub.superv1; // superv1
sub.superv2; // superv2
```
接下来，做如下操作后，再次查看对象sub的属性：
``` javascript
delete sub.subv1; // true
delete sub.subv2; // true
delete sub.superv1; // true
delete sub.superv2; // true

sub.subv1; // undefined
sub.subv2; // subv2
sub.superv1; // undefined
sub.superv2; // superv2
```

subv1和superv1都变为 undefined了，但是subv2和superv2值仍然保留。请注意subv1、subv2 `subclass.prototype.subv2 = 'subv2';`和superv1、superv2 `superclass.prototype.superv2 = 'superv2';`在定义时的不同。可以看到，是prototype这个属性造成了subclass中两个属性的不同行为。接下来，首先要详细了解prototype原型链。

##prototype原型链
###原型链的作用
来看一个摘自《javascript高级程序设计》中一个例子：

``` javascript
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}
// 通过将SuperType的一个实例赋值给SubType.prototype，实现SubType的继承
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};

var instance = new SubType();
console.info(instance.getSuperValue()); //true
```

###原型链的原理
《javascript高级程序设计》中对该段代码的解释如下：
> 当以读取模式访问一个实例属性时，首先会在实例中搜索该属性，如果没有找到，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上。以本例来说，调用instance.getSuperValue()会经历三个搜索步骤：1）搜索实例instance；2）搜索SubType.prototype；3）搜索SuperType.prototype

上例中的原型链调用说明图
![上例中的原型链调用说明图](./原型链.png)


调试器中也能看到instance的调用结构，`__proto__`就是当前实例的原型属性prototype
![prototype调试](./prototype_debug.png)


即 instance -> SubType.prototype -> SuperType.prototype -> Object.prototype

接下来我们再来通过代码继续熟悉prototype

``` javascript
var instance2 = new SubType();

instance.property = false;
instance.getSuperValue(); // false
instance2.getSuperValue(); // true
SubType.prototype.getSuperValue(); // true
```

当代码`instance.property = false;`执行后，相当于在实例instance内部添加了属性peoperty。`instance.getSuperValue();`再次执行时，在第一个搜索步骤：1）搜索实例instance里，就可以找到property，所以显示的是false。
而`instance2.getSuperValue();`依然需要三步搜索，才能找到property属性。

这也就解释了在Ext.extend函数执行后，`delete sub.subv2;`无效的原因，sub的实例中没有subv2,当查看sub.subv2时，实际上看到的是sub实例的直接构造器subclass的原型prototype中的subv2的值。

###原型链的问题
通过原型链，我们实现了SubType继承SuperType的属性和函数，那是不是Ext.extend也是这么做的呢，来看接下来的例子：

``` javascript
// 修改SuperType中属性
function SuperType(){
    this.property = true;
    this.queue = [1,2,3];
}
SuperType.prototype.getQueue = function(){
    console.info(this.queue.join(','));
};

function SubType(){}
SubType.prototype = new SuperType();

var instance = new SubType();
var instance2 = new SubType();

instance.getQueue();  // 1,2,3
instance2.getQueue(); // 1,2,3

instance.queue.push(4);

instance.getQueue();  // 1,2,3,4
instance2.getQueue(); // 1,2,3,4
```

可以看到，当instance修改了自己的queue的值的时候，instance2的值也被修改了。原因在于javascript的传值方式为按值传递，此时instance.queue就是SubType.prototype(此处传递的值实际上是数组queue的地址)。等同于下面的小例子：

``` javascript
var a = [1,2,3]; // a可以看作数组[1,2,3]的首地址
var b = a; // 此时b也指向同一个地址[1,2,3]，而不是重新新建一个[1,2,3]数组
b.push(4);
a // [1,2,3,4]
```

在Ext中，我们大量使用的是非简单类型的Object，如果使用**原型链**的方式去实现继承，那么任意一个实例的修改，都会影响到继承自同一个superclass的其他子类。

##其他继承方式
###借用构造函数
看下面的代码是不是很熟悉：

``` javascript
// 修改上例中SubType的构造函数
function SubType(){
    SuperType.call(this); // 我们的代码中则是这样的形式：Bom.IT0010.superclass.constructor.call(this)；
}

var instance = new SubType();
instance.getQueue(); // 报错： TypeError: undefined is not a function。 getQueue没有定义
instance.queue; // [1,2,3]。 但是属性queue被继承了

var instance2 = new SubType();
instance2.queue; // [1,2,3]

instance.queue.push(4);
instance.queue;  // [1,2,3,4]
instance2.queue; // [1,2,3]
```

此时的instance2.queue不再受到instance.queue的影响。因为在`new SubType()`的时候，执行了`SuperType.call(this)` 即 SuperType的构造函数，该构造函数创建了queue的实例，instance.queue和instance2.queue此时已经是指向不同的数组对象了。

但同时，也要看到，通过Super.prototype定义的getQueue方法，并没有被继承下来，因为借用构造函数并没有修改SubType的原型链。此时instance的原型链为：instance -> SubType.prototype -> Object.prototype。

###组合继承
如果将原型链和借用构造函数继承结合起来，则可以比较完美的解决继承问题。将易变化的一些变量放在构造函数中，使用借用构造函数继承，如`Store`的`record`，`record`中的`data`等，将不易变化的一些方法放在prototype中，如`Store.load()`、`Record.getAt()`等。

方法就是在上面的代码基础上，在SubType的构造函数后加上：`SubType.prototype = new SuperType();`；

####组合继承的问题
组合继承看似将SuperType的属性、方法全部都继承了，但是仔细考虑一下，会发现在SuperType构造函数内定义的`property`会被继承两遍。第一遍出现在：`SubType.prototype = new SuperType();`，SubType的原型中包含了`property`。第二遍出现在SubType的构造函数中：`SuperType.call(this);`。

一般来说，我们希望把变化的属性放在构造函数内定义、不变的函数放在原型中定义，并且希望继承的subclass、subType也保持这样的行为，但是组合继承会将superclass、SuperType所有的属性、方法全部存入子类的原型中，这显然是不好的。

###原型式继承和寄生组合式继承
我们的需求有两个：

1. 子类的实例继承父类实例的属性
2. 子类的原型继承父类原型的属性

组合继承中，借用构造函数的方式很好的完成了需求1，但是原型链的方法却没有很好的完成需求2。接下来就要考虑如何满足2，看下面的代码：

``` javascript
// object函数会返回一个实例，该实例的自身属性为空，原型则包含了类O的原型prototype
function object(O){
    function F(){};
    F.prototype = O.prototype;
    return new F();
}

function extend(subType, superType){
    // 通过调用object函数，返回一个只包含superType的原型，却不包含superType的实例属性的实例
    // 这是解决需求2的关键
    var prototype = object(superType);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
```

通过调用上面的extend方法，就能构造一个满足两面2点需求的子类。

##Ext.extend实现方式解析
现在再回过头来看一下Ext.extend的源码：

``` javascript
  */
extend : function(){
    // inline overrides
    var io = function(o){
        for(var m in o){
            this[m] = o[m];
        }
    };
    var oc = Object.prototype.constructor; //

    return function(sb, sp, overrides){  // sb = subclass，sp=superclass
        // 通过判断 sp是对象({}) 还是函数(function)，来确认是2参数形式的调用还是3参数形式的调用
        if(typeof sp == 'object'){
            overrides = sp;
            sp = sb;
            sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
        }
        var F = function(){},  // 原型式继承使用的空函数
            sbp,
            spp = sp.prototype;

        F.prototype = spp;  // 原型式继承 superclass的prototype
        sbp = sb.prototype = new F(); // subclass的prototype = superclass的prototype，建立subclass和superclass的原型链
        sbp.constructor=sb; // 修改constructor
        sb.superclass=spp;  // 定义superclass，这也是我们在subclass构造函数里使用借用构造函数继承的关键
        // 如果superclass的prototype是字面量对象，不太清楚为什么会有这样的判断
        if(spp.constructor == oc){
            spp.constructor=sp;
        }
        sb.override = function(o){
            Ext.override(sb, o);
        };
        sbp.superclass = sbp.supr = (function(){
            return spp;
        });
        sbp.override = io;
        // 将overrides需要覆盖和追加的属性加入sb中
        Ext.override(sb, overrides);
        sb.extend = function(o){return Ext.extend(sb, o);};
        return sb;
    };
}()
```
