最近在项目中推行使用ES6编码，选择了webpack进行babel预编译和打包部署。  

在参考了webpack官网介绍：[what-is-webpack](http://webpack.github.io/docs/what-is-webpack.html)和[getting-startd](http://webpack.github.io/docs/tutorials/getting-started/)，以及github上各种构建seed项目后，建立了一套自己的angular-es6-webpack框架：[angular-adminlte-plugin](https://github.com/kakanjau/angular-adminlte-plugin)。  

总结一下使用了ES6和webpack后，项目前后的变化：

### 旧时代

我们以前的angular项目中，都会把所有的js、css文件全部放在index.html的`body`底部引入，加上一些注释，后期可以利用grunt直接进行合并、压缩：

```
  <!-- lib部分  -->
  <script src="jquery.js">
  <script src="angular.js">
  <script src="ui-router.js"> 
  
  <!-- 配置部分  -->
  <script src="main.js">
  
  <!-- 业务部分  -->
  <script src="service1.js">
  <script src="filter1.js">
  <script src="controller1.js">
```

虽然现在AMD、CMD已经很成熟流行了，但是因为angular本身的特性（几乎所有的业务代码都在controler、service、directive中），不是很需要特意对代码再次进行模块化。

> PS：进公司面试的时候，跟民工叔说我之前的公司用requireJs和grunt进行angular项目的构建。叔问我用requirejs的目的是什么，我想了半天，最大的好处应该就是不需要每新加一个js文件，就得在index.html里加上一个`script`标签了。但实际上，总还是需要找到一个地方，去require自定义的那么多controller、service、directive文件。

### 新时代

#### ES6的Module
ES6新特性里，对项目构建影响最大的是`Module`功能。关于该功能可以参考阮一峰大大的[ES6入门-Module](http://es6.ruanyifeng.com/#docs/module)。

在使用webpack构建的时候，webpack会根据代码中`import`命令，查找依赖关系，将所有被依赖到的资源按照配置进行打包。
代码结构因此变成了下面的样子：

```
  // ----index.html----
  <script scr="main.js">
  
  // ----main.js----
  // 理想的main.js执行顺序
  
  // 加载依赖库
  import 'jquery';
  import 'angular';
  
  // 定义app
  let app = angular.module('app', []);
  
  // 加载app下的service、controller、filter
  import service from 'service1';
  import controller from 'controller1';
  import filter from 'filter1';
```

但是，由于ES6中`import`命令具有提升效果，不管写在文件的哪里，都会提升到整个文件的头部(`这里是跟requirejs不一样的地方`)。
会导致`import service from 'service1'`这样的命令早于`app`被定义之前执行。由于此时还没有`app`，代码必然会报错。

解决方案如下：

```
  // ----main.js----
  
  // 加载依赖库
  import 'jquery';
  import 'angular';
  
  // 加载app下的service、controller、filter
  import serviceHandler from 'service1';
  import controllerHandler from 'controller1';
  import filterHandler from 'filter1';
  
  // 定义app
  let app = angular.module('app', []);
  
  serviceHandler(app);
  controllerHandler(app);
  filterHandler(app);
  
  // ----service1.js----
  export default function(app){
    app.service('service1', [function(){
      return {}
    }]) 
  }
  
```
在service1.js里，并不是直接去定义`service`，而是返回一个定义`service`的方法，让`app`去调用。

#### Webpack的loader
webpack对自身的定义就是模块加载器。loader就是webpack实现模块加载的核心工具。webpack官方文档对loader的介绍：[what are loaders](http://webpack.github.io/docs/using-loaders.html)。

结合我们项目中使用的loader来进行说明：
```
  // module
  config.module = {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(eot(\?.*)?|woff(\?.*)?|ttf(\?.*)?|svg(\?.*)?|woff2(\?.*)?)$/, loader: "file-loader" },
      {test: /\.(md|markdown)$/, loader: "html!markdown" },
      {test: /\.html/, exclude: /(node_modules)/, loader: 'html-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?mimetype=image/png'},
      {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel', query: {presets: ['es2015']}}
    ]
  };
```
webpack会根据`module.loaders`的配置，对`import`的资源进行预编译。
上面的配置中，`test`是一个正则表达式的判断，import的资源中，符合该正则表达式的，就会使用后面loader定义的加载器对资源进行加载。

比如，在`main.js`中有`import "./business/style/basic-style.css";`。此时`style-loader!css-loader`就会对该资源进行css式样的处理。
可以看到，我们的项目里，对css、字体文件、markdown文件、html文件、图片文件、js文件都进行了预处理。

#### Webpack的plugin
webpack的主要功能是模块加载，plugin则给webpack提供了额外的其他功能([webpack-plugin](http://webpack.github.io/docs/using-plugins.html))。

这些功能包括但不限于以下类别：
- config
- output
- optimoptimize
- module styles
- dependency injection
- localization
- debugging
- 其他及第三方

下面是我在项目中用到的比较特殊的plugin，有些是官方的，有些是第三方的：
- CopyWebpackPlugin   
  执行文件拷贝，由于没有使用grunt或gulp，所以用这个插件来将不需要编译的文件拷入生产目录
  `new CopyWebpackPlugin([{from: './src', to:'./'}], {ignore: ['*.js', 'index.html']})`
- webpack.ProvidePlugin
  将第三方库的namespace定义为全局变量
  `webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "window.jQuery": "jquery"})`
- HtmlWebpackPlugin
  改造入口html文件，将编译后的js文件，引入入口html中
  `HtmlWebpackPlugin({template: path.resolve('src', 'index.html'), inject: 'body'})`
- webpack.optimize.UglifyJsPlugin  
  官方提供的优化类插件，该插件会对代码进行压缩，并删除map。大幅降低编译合并后js文件的大小。比如我项目中的`ng.bundle.js`，使用该插件前大小为4.7MB,使用该插件后，体积降为337KB。
  
#### Webpack的devServer
webpack提供了**devServer**方便进行开发：[webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html)。

webpack的devServer有以下功能：
- Automatic Refresh watch代码修改，并自动刷新页面
- Hot Module Replacement 模块热替换
- Proxy 反向代理，直接调用后台服务器提供的接口


这样，仅使用webpack就搭建起来一个可以胜任项目开发的、基于ES6的前端架构。应该已经可以满足中小型项目的需求了。
对于大型的前端项目，还需要grunt/gulp的配合，以及karma进行测试部署。