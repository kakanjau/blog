###getter和setter
--------
// 这个对象有一个可以返回随机数的存取器属性

var random = {
get octet() { return Math.floor(Math.random() * 256); },
get uint16() { return Math.floor(Math.random() * 65546); },
get int16() { return Math.floor(Math.random() * 65536) - 32768; }
}

### 数据属性
--------
- value(值)
- writable(可写)
- enumerable(可枚举)
- configurable(可配置)

通过调用`Object.getOwnPropertyDescriptor`可以获得某个对象特定属性的属性描述符
通过调用`Object.defineProperty`可以修改某个对象特定属性的数据属性

Object.defineProperty({x:1}, "x", {
value: 2,
writable: true,
enumerable: false,
configurable: true
}
);

> `Object.defineProperties`可以修改多个属性