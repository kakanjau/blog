> 本篇介绍如何使用nodejs下的selenium-webdriver完成一个比较完整的测试脚本。

1个完整的测试脚本应该包括以下功能：

- 浏览器/网页元素控制
- 网页元素查找
- 判断、等待
- 截图

### 浏览器/网页元素控制
> 在node-modules/selenium-webdriver下的command.js文件中，可以看到selenium提供的控制方法：

GET_SERVER_STATUS: 'getStatus',  
NEW_SESSION: 'newSession',  
GET_SESSIONS: 'getSessions',  
DESCRIBE_SESSION: 'getSessionCapabilities',  

CLOSE: 'close',  
QUIT: 'quit',  

GET_CURRENT_URL: 'getCurrentUrl',  
GET: 'get',  
GO_BACK: 'goBack',  
GO_FORWARD: 'goForward',  
REFRESH: 'refresh',  

ADD_COOKIE: 'addCookie',  
GET_COOKIE: 'getCookie',  
GET_ALL_COOKIES: 'getCookies',  
DELETE_COOKIE: 'deleteCookie',  
DELETE_ALL_COOKIES: 'deleteAllCookies',  

GET_ACTIVE_ELEMENT: 'getActiveElement',  
FIND_ELEMENT: 'findElement',  
FIND_ELEMENTS: 'findElements',  
FIND_CHILD_ELEMENT: 'findChildElement',  
FIND_CHILD_ELEMENTS: 'findChildElements',  

CLEAR_ELEMENT: 'clearElement',  
CLICK_ELEMENT: 'clickElement',  
SEND_KEYS_TO_ELEMENT: 'sendKeysToElement',  
SUBMIT_ELEMENT: 'submitElement',  

GET_CURRENT_WINDOW_HANDLE: 'getCurrentWindowHandle',  
GET_WINDOW_HANDLES: 'getWindowHandles',  
GET_WINDOW_POSITION: 'getWindowPosition',  
SET_WINDOW_POSITION: 'setWindowPosition',  
GET_WINDOW_SIZE: 'getWindowSize',  
SET_WINDOW_SIZE: 'setWindowSize',  
MAXIMIZE_WINDOW: 'maximizeWindow',  

SWITCH_TO_WINDOW: 'switchToWindow',  
SWITCH_TO_FRAME: 'switchToFrame',  
GET_PAGE_SOURCE: 'getPageSource',  
GET_TITLE: 'getTitle',  

EXECUTE_SCRIPT: 'executeScript',  
EXECUTE_ASYNC_SCRIPT: 'executeAsyncScript',  

GET_ELEMENT_TEXT: 'getElementText',  
GET_ELEMENT_TAG_NAME: 'getElementTagName',  
IS_ELEMENT_SELECTED: 'isElementSelected',  
IS_ELEMENT_ENABLED: 'isElementEnabled',  
IS_ELEMENT_DISPLAYED: 'isElementDisplayed',  
GET_ELEMENT_LOCATION: 'getElementLocation',  
GET_ELEMENT_LOCATION_IN_VIEW: 'getElementLocationOnceScrolledIntoView',  
GET_ELEMENT_SIZE: 'getElementSize',  
GET_ELEMENT_ATTRIBUTE: 'getElementAttribute',  
GET_ELEMENT_VALUE_OF_CSS_PROPERTY: 'getElementValueOfCssProperty',  
ELEMENT_EQUALS: 'elementEquals',  

SCREENSHOT: 'screenshot',  
IMPLICITLY_WAIT: 'implicitlyWait',  
SET_SCRIPT_TIMEOUT: 'setScriptTimeout',  
SET_TIMEOUT: 'setTimeout',  

ACCEPT_ALERT: 'acceptAlert',  
DISMISS_ALERT: 'dismissAlert',  
GET_ALERT_TEXT: 'getAlertText',  
SET_ALERT_TEXT: 'setAlertValue',  

EXECUTE_SQL: 'executeSQL',  
GET_LOCATION: 'getLocation',  
SET_LOCATION: 'setLocation',  
GET_APP_CACHE: 'getAppCache',  
GET_APP_CACHE_STATUS: 'getStatus',  
CLEAR_APP_CACHE: 'clearAppCache',  
IS_BROWSER_ONLINE: 'isBrowserOnline',  
SET_BROWSER_ONLINE: 'setBrowserOnline',  

GET_LOCAL_STORAGE_ITEM: 'getLocalStorageItem',  
GET_LOCAL_STORAGE_KEYS: 'getLocalStorageKeys',  
SET_LOCAL_STORAGE_ITEM: 'setLocalStorageItem',  
REMOVE_LOCAL_STORAGE_ITEM: 'removeLocalStorageItem',  
CLEAR_LOCAL_STORAGE: 'clearLocalStorage',  
GET_LOCAL_STORAGE_SIZE: 'getLocalStorageSize',  

GET_SESSION_STORAGE_ITEM: 'getSessionStorageItem',  
GET_SESSION_STORAGE_KEYS: 'getSessionStorageKey',  
SET_SESSION_STORAGE_ITEM: 'setSessionStorageItem',  
REMOVE_SESSION_STORAGE_ITEM: 'removeSessionStorageItem',  
CLEAR_SESSION_STORAGE: 'clearSessionStorage',  
GET_SESSION_STORAGE_SIZE: 'getSessionStorageSize',  

SET_SCREEN_ORIENTATION: 'setScreenOrientation',  
GET_SCREEN_ORIENTATION: 'getScreenOrientation',  

// These belong to the Advanced user interactions - an element is
// optional for these commands.
CLICK: 'mouseClick',  
DOUBLE_CLICK: 'mouseDoubleClick',  
MOUSE_DOWN: 'mouseButtonDown',  
MOUSE_UP: 'mouseButtonUp',  
MOVE_TO: 'mouseMoveTo',  
SEND_KEYS_TO_ACTIVE_ELEMENT: 'sendKeysToActiveElement',  

// These belong to the Advanced Touch API
TOUCH_SINGLE_TAP: 'touchSingleTap',  
TOUCH_DOWN: 'touchDown',  
TOUCH_UP: 'touchUp',  
TOUCH_MOVE: 'touchMove',  
TOUCH_SCROLL: 'touchScroll',  
TOUCH_DOUBLE_TAP: 'touchDoubleTap',  
TOUCH_LONG_PRESS: 'touchLongPress',  
TOUCH_FLICK: 'touchFlick',  

GET_AVAILABLE_LOG_TYPES: 'getAvailableLogTypes',  
GET_LOG: 'getLog',  
GET_SESSION_LOGS: 'getSessionLogs'  

命令非常完备，包括对浏览器前进、后退、刷新的控制，session、cookie的控制，window窗口的控制，location、storage的控制，当然还有页面内element元素的获取、赋值、点击等等。

以第一篇中的简单例子做参考：

var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
.withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get('http://www.baidu.com');
driver.findElement(webdriver.By.name('wd')).sendKeys('simple programmer');
driver.quit();

`get`、`findElement`、`sendKeys`、`quit`这些命令都可以在上面列表中找到。

### 网页元素查找
> webdriver中对元素的定义需要使用`webdriver.Locator`，如上例中的`driver.findElement`以及其他有关元素定位的函数，接受的参数都是`webdriver.Locator`。而`webdriver.By`则提供一系列的方法，返回定位后的`webdriver.Locator`对象。

常用的定位方法包括：

- `webdriver.By.className(className)`  
利用className定位
- `webdriver.By.id(id)`  
利用元素id定位
- `webdriver.By.name(name)`  
利用元素name定位
- `webdriver.By.tagName(text)`  
利用元素tagName定位，等同于DOM中的`getElementsByTagName`  
利用元素name定位
- `webdriver.By.css(selector)`  
利用css选择器定位，几乎可以定位到页面内所有的元素
- `webdriver.By.xpath(xpath)`  
利用xpath选择器定位，几乎可以定位到页面内所有的元素

> 对于拥有id、name、className、tagName的元素，调用对应的方法即可快速定位，稍微复杂一些的，可以通过css、xpath定位。由于css选择器几乎是所有前端开发都熟悉的定位方式，所以更推荐css方法。

其他的方法还包括：`webdriver.By.js(script, var_args)`(javascript表达式返回element元素)、`webdriver.By.linkText(text)`(可见的text内容与给定参数一致的元素)、`webdriver.By.partialLinkText(text)`(可见的text内容包含给定参数的元素)。

### 判断/等待

> web测试中，不可避免出现需要等待的场景，比如等待页面打开、等待请求返回等等。
webdriver贴心的提供了wait方法：

driver.wait(webdriver.until.elementLocated(webdriver.By.css('a.buybtn')), 10000);

`driver.wait`方法接受3个参数：`condition, timeout, opt_message`。

- condition可以是一个boolean表达式，也可以是`webdriver.until.Condition`对象
- timeout是wait的最长时间
- message在timeout之后会返回

`condition`参数通常会是一个`webdriver.until.Condition`，webdriver.until提供了多种方法进行循环条件判断：

- `webdriver.until.ableToSwitchToFrame ( frame )`
Creates a condition that will wait until the input driver is able to switch to the designated frame. The target frame may be specified as:
A numeric index into window.frames for the currently selected frame.
A webdriver.WebElement, which must reference a FRAME or IFRAME element on the current page.
A locator which may be used to first locate a FRAME or IFRAME on the current page before attempting to switch to it.
Upon successful resolution of this condition, the driver will be left focused on the new frame.
- `webdriver.until.alertIsPresent ( )`
Creates a condition that waits for an alert to be opened. Upon success, the returned promise will be fulfilled with the handle for the opened alert.
- `webdriver.until.elementIsDisabled ( element )`
Creates a condition that will wait for the given element to be disabled.
- `webdriver.until.elementIsEnabled ( element )`
Creates a condition that will wait for the given element to be enabled.
- `webdriver.until.elementIsNotSelected ( element )`
Creates a condition that will wait for the given element to be deselected.
- `webdriver.until.elementIsNotVisible ( element )`
Creates a condition that will wait for the given element to be in the DOM, yet not visible to the user.
- `webdriver.until.elementIsSelected ( element )`
Creates a condition that will wait for the given element to be selected.
- `webdriver.until.elementIsVisible ( element )`
Creates a condition that will wait for the given element to become visible.
- `webdriver.until.elementLocated ( locator )`
Creates a condition that will loop until an element is found with the given locator.
- `webdriver.until.elementTextContains ( element, substr )`
Creates a condition that will wait for the given element's visible text to contain the given substring.
- `webdriver.until.elementTextIs ( element, text )`
Creates a condition that will wait for the given element's visible text to match the given text exactly.
- `webdriver.until.elementTextMatches ( element, regex )`
Creates a condition that will wait for the given element's visible text to match a regular expression.
- `webdriver.until.elementsLocated ( locator )`
Creates a condition that will loop until at least one element is found with the given locator.
- `webdriver.until.stalenessOf ( element )`
Creates a condition that will wait for the given element to become stale. An element is considered stale once it is removed from the DOM, or a new page has loaded.
- `webdriver.until.titleContains ( substr )`
Creates a condition that will wait for the current page's title to contain the given substring.
- `webdriver.until.titleIs ( title )`
Creates a condition that will wait for the current page's title to match the given value.
- `webdriver.until.titleMatches ( regex )`
Creates a condition that will wait for the current page's title to match the given regular expression.

### 截图
> 测试完成后的截图也是比不可少的

下面的代码可以实现浏览器截图：

driver.takeScreenshot().then(function(data){
var base64Data = data.replace(/^data:image\/png;base64,/,"");
fs.writeFile(path, base64Data, 'base64', function(err) {
if(err) console.log(err);
});
});

> !这里有一个问题，如果网页的内容超过1屏，截图只能截到当前显示的内容，超出部分无法截取。


### selenium-webdriver的promise
> 了解javascript的`promise`机制的人可能已经注意到了，上面的例子中大量出现`.then`这样的写法。

javascript的promise机制不在本文的讲解访问内，不太了解的可以上百度谷歌之。
selenium-webdirver的promise实现了2点：

- ***driver下的所有方法，返回的都是promise***。
- ***driver下的所有方法，按照调用顺序进入promise的flow，然后依次执行***。

下面给出官方的2个例子来说明：

1. 使用传统callback时的代码：

driver.get("http://www.google.com", function() {
driver.findElement(By.name("q"), function(q) {
q.sendKeys("webdriver", function() {
driver.findElement(By.name("btnG"), function(btnG) {
btnG.click(function() {
driver.getTitle(function(title) {
assertEquals("webdriver - Google Search", title);
});
});
});
});
});
});

2. 使用webdriver的promise后：

driver.get("http://www.google.com");
driver.findElement(By.name("q")).sendKeys("webdriver");
driver.findElement(By.name("btnG")).click();
driver.getTitle().then(function(title) {
assertEquals("webdriver - Google Search", title);
});

> 例2中不见了一层层的callback回调，driver在执行时，按照各个方法被调用的顺序，依次执行。代码清爽了不少。


### 一个完整的测试脚本
> 下面是笔者写的一个测试脚本。鉴于本博客基本没人看，拍板砖的人都木得，也就不需要自谦了。

文件1： selenium/chrome_text.js

```
var webdriver = require('selenium-webdriver');

var login = require('./huijia/login_test');
var order = require('./huijia/orderCommodity');
var screenShot = require('./util/screenShot');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

login.init(driver, webdriver);
order.init(driver, webdriver);

login.run()
.then(function(){
driver.wait(webdriver.until.elementLocated(webdriver.By.css('a.buybtn')), 10000);
order.run();
}).then(function(){
screenShot.shot(driver, 'e://test.png');
});

文件2：selenium/huijia/login_text.js

var test = {};

var localDriver = null;
var localWebdriver = null;

test.init = function(driver, webdriver){
localDriver = driver;
localWebdriver = webdriver;
};

test.open = function(){
return localDriver.get('http://mall.huijiacn.com/#/login');
};

test.fillForm = function(){
var username = localDriver.findElement(localWebdriver.By.name('phone'));
username.sendKeys('18012950566');
var pass = localDriver.findElement(localWebdriver.By.name('password'));
pass.sendKeys('41220403');
var btn = localDriver.findElement(localWebdriver.By.xpath("//a[@class='btn-img btn-entry']"));
return btn.click();
};

test.run = function(){
var promise = test.open().then(function(){
localDriver.wait(localWebdriver.until.elementLocated(localWebdriver.By.name('phone')), 10000);
}).then(function(){
test.fillForm();
});
return promise;
};

module.exports = test;

文件3：selenium/huijia/order_commodity.js

var test = {};

var localDriver = null;
var localWebdriver = null;
var elem = null;

test.init = function(driver, webdriver){
localDriver = driver;
localWebdriver = webdriver;
elem = elem || {
numberType: localWebdriver.By.id('numberType0'),
pickNumber: localWebdriver.By.css('#newNumTable tr:first-child td:first-child'),
pickBtn: localWebdriver.By.css('.ensure'),
buyBtn: localWebdriver.By.css('#buy-btn a'),
ctmInfoForm: localWebdriver.By.name('custInfoForm')
};
};

test.pick = function(){
var btn = localDriver.findElement(localWebdriver.By.css('a.buybtn'));
return btn.click();
};

test.order = function(){
return localDriver.findElement(elem.numberType).click()
.then(function(){
localDriver.wait(localWebdriver.until.elementLocated(elem.pickNumber), 5000);
localDriver.findElement(elem.pickNumber).click();
localDriver.findElement(elem.pickBtn).click();
localDriver.wait(localWebdriver.until.elementLocated(elem.buyBtn), 5000);
localDriver.findElement(elem.buyBtn).click();
localDriver.wait(localWebdriver.until.elementLocated(elem.ctmInfoForm), 5000);
});
};

test.run = function(){
var promise = test.pick()
.then(function(){
localDriver.wait(localWebdriver.until.elementLocated(localWebdriver.By.id('numberType0')), 10000);
test.order();
});
return promise;
};

module.exports = test;

文件4：selenium/util/screen_shot.js

var fs = require('fs');

function shot(driver, path){
return driver.takeScreenshot().then(function(data){
var base64Data = data.replace(/^data:image\/png;base64,/,"");
fs.writeFile(path, base64Data, 'base64', function(err) {
if(err) console.log(err);
});
});
}

exports.shot = shot;
```