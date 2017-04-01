## 原理

UI自动测试原理大致相同，需要一个能够捕获元素并控制元素的驱动，然后是判断测试结果并生成结果的工具。

对于web的UI自动测试，前者就是**selenium**了。[selenium](http://www.seleniumhq.org/)提供了一系列测试函数，支持多浏览器(IE、firefox、chrome、Android)测试，支持丰富的元素选择方法、浏览器页面标签控制、截图等。

selenium支持多种语言的测试脚本：*Java*、*C#*、*Python*、*ruby*、*PHP*、*nodejs*等。作为前端开发，当然首选nodejs作为测试脚本。

mochajs是一个nodejs的javascript测试框架，在这里用于调用selenium的nodejs测试脚本，并生成测试报告。

## start up
### selenium工具

selenium工具主要包含：*selenium-service-standalone*、*selenium-webDriver*、*selenium-ide*、其他第三方插件。这些工具在官网的[下载页面](http://www.seleniumhq.org/download/)都可以下载到。下面依次说明各个工具的作用：

- selenium-service-standalone：selenium的核心工具，用于解释、运行selenium脚本，启动、关闭浏览器，扮演HTTP代理的角色，截获、验证在浏览器和被测试的应用程序之间的HTTP消息
- selenium-webDriver：selenium的客户端工具，提供对编程的支持，这样就可以自己设计测试脚本程序。针对不同的语言，有不同的selenium客户端工具，Java、C#等可以从官网下载，然后用对应的IDE创建工程， 导入下载的客户端工具。NodeJs直接在测试工程文件夹下执行：`npm install selenium-webdriver`即可。
- selenium-ide：firefox的一个插件，可以在firefox下进行测试录制，自动生成测试脚本。
- 其他工具：其他工具中主要是一些浏览器的drive，比如chromedriver(提供对chrome浏览器的控制支持)、IEDriverService(提供对IE浏览器的控制支持)

### mocha工具

mochaJs直接通过npm安装`npm install -g mocha`。

### 第一个测试

1. 在E盘下新建文件夹：selenium_test，之后所有的测试工程都在该文件夹下进行。
2. 在selenium_test目录下执行：`npm install selenium-webdriver`

#### chrome浏览器测试
> selenium为chrome专门提供了serviceDriver，所以chrome浏览器的测试与其他浏览器测试稍有不同

1. 如果chrome安装不是默认目录，则需要将chrome安装目录加入系统path
2. 将上文下载的chromedriver.exe所在文件夹加入系统PATH
3. 在selenium_test文件夹下新建test.js：
````
var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
.withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get('http://www.baidu.com');
driver.findElement(webdriver.By.name('wd')).sendKeys('simple programmer');
driver.quit();
````
4. 在selenium_test目录下，打开cmd，执行`node test.js`

#### firefox浏览器测试
> 其他浏览器都需要通过*selenium-service-standalone*来进行。

1. 如果对应的测试浏览器安装不是默认目录，则需要将对应浏览器安装目录加入系统path
2. 在selenium_test文件夹下新建firefox.js：
````
var webdriver = require('selenium-webdriver'),
SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var server = new SeleniumServer('e://download/develop/selenium/selenium-server-standalone-2.44.0.jar', {
port: 4444
});

server.start();

var driver = new webdriver.Builder().
usingServer(server.address()).
withCapabilities(webdriver.Capabilities.firefox()).
build();

driver.get('http://www.baidu.com');
driver.findElement(webdriver.By.name('wd')).sendKeys('simple programmer');
driver.quit();
````
3. 在selenium_test文件夹下打开cmd，执行`node firefox.js`

### mocha测试
1. 在selenium_test文件夹下新建mocha_test.js
````
var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

test.describe('baidu Search', function() {
test.it('should work', function() {
var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();
driver.get('http://www.baidu.com');
var searchBox = driver.findElement(webdriver.By.name('wd'));
searchBox.sendKeys('simple programmer');
searchBox.getAttribute('value').then(function(value) {
assert.equal(value, 'simple programmer');
});
driver.quit();
});
});
````
2. 在selenium_test文件夹下打开cmd，执行`mocha -t 10000 mocha_test.js`。能够看到测试再次被执行，同时cmd中出现测试结果报告。