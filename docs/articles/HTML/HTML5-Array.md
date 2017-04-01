##小技巧##
###快速创建指定长度的、值为undefined的稠密数组
> javascript的数组长度是根据值内容实时变更的。当使用`[new] Array(100)`创建数组时，默认创建的是1个length=100的稀疏数组。即该数组虽然长度为100，但是没有任何一个实例成员。
例：

var a = new Array(5);
var b = [undefined, undefined, undefined, undefined, undefined];
// 下面4行代码，a、b的行为是一致的
a.length; // 5
b.length; // 5
a[0]; // undefined
b[0]: // undefined

// 下面是a、b的区别
0 in a; false
0 in b; true
a.map(function(item, index){return index}); // undefined
b.map(function(item, index){return index}); // [0,1,2,3,4]

// 为了使a有类似b的行为，可以用下面的代码实现
Array.apply(null, a).map(function(item, index){return index}); // [0,1,2,3,4]