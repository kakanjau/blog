> Effective JavaScript 编写高质量javascript代码的68个有效方法
> - 第33条：使构造函数与new操作符无关
> - 第34条：在原型中存储方法
> - 第35条：使用闭包存储私有数据
> - 第36条：只将实例状态存储在实例对象中

--------------
在关于对象和原型的有效方法中，这4条是与创建一个对象相关的。  

###34、36###
组合起来，就是属性放在实例中，方法放在原型中 
从面向对象的角度很容易理解。就像java一样，class中的属性是可以随便赋值的，但是方法不能修改。 

    // 符合34、36属性放在实例中，方法放在原型定义的实例：
    function User(name, password){
        this.name = name;
        this.password = password;
    }
    User.prototype.toString = function(){
        return this.name;
    };
    User.prototype.checkPassword = function(password){
        return this.password = password;
    };

###35 ###
使用闭包隐藏数据 
闭包作为javascript入门级的高阶知识，在函数调用中会比较经常被使用到，而且目的是为了保护变量不被污染，同时可以被完善调用，而不是为了信息隐藏。而且javascript似乎天生就不会隐藏信息，所以很少从这一方面去做考虑。

    // 使用闭包隐藏信息的实例：
    function User(name, password){
        this.name = name;
        this.password = password;
        var localName = name;
        var localPass = password;

        this.toString = function(){
            return localName;
        };
    }

    User.prototype.checkPassword = function(password){
        return localPass == password;
    }

    var user = new User('qiao', 123);
    user.toString(); // qiao
    user.name = 'zhang';
    user.toString(); // qiao

    user.checkPassword(); // ReferenceError: localPass is not defined

上面的代码中，对象user调用toString方法时，可以正常返回 localName的值，且不会受到this.name变化的影响。但是调用checkPassword的时候出错，因为在checkPassword定义的时候，已经超出了局部变量 localPass的作用域范围

###33###
使构造函数与new无关 
之所以把这个放在最后写，是因为前面3个还算是平时会考虑到的，而33则以前几乎没有考虑过这样的情况。虽然javascript的function是实例和方法不分的，但是似乎从来也没有考虑过这样的坏处。 
还是以上例的实例User为例。`var u = new User();`会返回一个User的对象，但是`var u = User();`呢，至少我以前从来没有考虑过。总觉得，一个function定义中出现了this，就天然说明这是一个实例了，就不应该不加 new 而直接去调用。此时的`u`是`undefined`，因为作为函数，User没有返回值。

    function User(name, password){
        var self = this instanceof User ? this : Object.create(User.prototype);
        self.name = name;
        self.password = password;

        return self;
    }

此时 'new User()' 和 'User()'的行为就是一样的了。