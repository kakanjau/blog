## mocha
> Mocha是一个基于node.js和浏览器的集合各种特性的Javascript测试框架，并且可以让异步测试也变的简单和有趣。Mocha的测试是连续的，在正确的测试条件中遇到未捕获的异常时，会给出灵活且准确的报告。Mocha托管在Github上。

mocha 有国内的官网网站：[mocha](http://mochacn.github.io/)。
mocha可以通过node的npm进行安装：`npm install -g mocha`

### mocha语法
> mocha提供BDD、TDD、exports三种风格的接口系统。

- "BDD"接口提供了describe()、it()、before()、after()、beforeEach()和afterEach可使用

describe('Array', function() {
before(function() {
// ...
});

describe('#indexOf()', function() {
it('should return -1 when not present', function() {
[1,2,3].indexOf(4).should.equal(-1);
});
});
});

- "TDD"接口提供了suite()、test()、setup()和teardown()可使用

suite('Array', function() {
setup(function() {
// ...
});

suite('#indexOf()', function() {
test('should return -1 when not present', function() {
assert.equal(-1, [1,2,3].indexOf(4));
});
});
});

- The "exports" interface is much like Mocha's predecessor expresso. The keys before, after, beforeEach, and afterEach are special-cased, object values are suites, and function values are test-cases.

module.exports = {
before: function() {
// ...
},

'Array': {
'#indexOf()': {
'should return -1 when not present': function() {
[1,2,3].indexOf(4).should.equal(-1);
};
};
};
};

### mocha 命令

mocha的命令行参数：

Usage: mocha [debug] [options] [files]

Commands:

init <path>
initialize a client-side mocha setup at <path>

Options:

-h, --help 输出用法信息
-V, --version 输出版本号
-r, --require <name> 加载指定的模块
-R, --reporter <name> 指定使用的监控器
-u, --ui <name> 指定使用的接口（bdd | tdd | exports）
-g, --grep <pattern> 只执行满足路径模式的测试脚本
-i, --invert inverts --grep matches
-t, --timeout <ms> 设置测试用例的超时时间，单位毫秒，默认为2000
-s, --slow <ms> "slow" test threshold in milliseconds [75]
-w, --watch 监测有变化的文件
-c, --colors 强制使用文本颜色
-C, --no-colors 强制关闭文本颜色
-G, --growl enable growl notification support
-d, --debug enable node's debugger, synonym for node --debug
-b, --bail bail after first test failure
-A, --async-only force all tests to take a callback (async)
--recursive 包含子文件夹
--debug-brk enable node's debugger breaking on the first line
--globals <names> allow the given comma-delimited global [names]
--check-leaks check for global variable leaks
--interfaces 显示可用的接口列表
--reporters 显示可用的监控器列表
--compilers <ext>:<module>,... use the given module(s) to compile files


### mocha 实践

#### 默认路径
mocha会默认使用 ./test/*.js 这个路径模式，所以使用mocha进行的测试，脚本应该放在根目录的test文件夹下。

#### 常用命令
常用命令形式如下：`mocha --reporter list --no-timeouts`

#### 重定向reporter到文本
使用重定向，可以将输出内容保存到指定的文件中：`mocha --reporter list --no-timeouts > result/result.txt 2>&1`

#### opts文件
Mocha会尝试取加载./test/mocha.opts文件，并把它与process.argv联系起来，但命令行参数的优先级更高。
如在 ./test 下新建mocha.opts文件，并写入以下内容：

--reporter list
--no-timeouts

则命令行命令可以减少为：`mocha > result/result.txt 2>&1`

如果是linux环境，可以在根目录下创建Makefiles文件，通过make执行test

## selenium-webdriver和mocha

### selenium-webdriver/testing 模块

testing模块提供一些列测试函数，并且可以直接被mocha执行。
下面是selenium-webdriver官方提供的例子：

var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

test.describe('Google Search', function() {
test.it('should work', function() {
var driver = new webdriver.Builder().build();

var searchBox = driver.findElement(webdriver.By.name('q'));
searchBox.sendKeys('webdriver');
searchBox.getAttribute('value').then(function(value) {
assert.equal(value, 'webdriver');
});

driver.quit();
});
});