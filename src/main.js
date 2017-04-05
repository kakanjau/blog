import "../node_modules/admin-lte/bootstrap/css/bootstrap.css";
import "./business/style/basic-style.css";

import snCommon from "./common/snCommon";

import appConfiguration from './config/config';
import appRouter from './config/router';
import appComponents from './business/components/components';
import appService from './business/service/service';

let app = angular.module('app', ['ui.router', 'ngSanitize', 'angularLocalStorage', snCommon.name]);

// 如果是工程开发，请使用注释掉的部分。打包production工程时，mock不会生效
// if(ENVIRONMENT == 'development'){
//   Mock.mockjax(app);
// }

// 本项目为纯粹前端项目，数据直接由mockData.js提供，所以需要mock一直生效

appConfiguration(app);
appRouter(app);
appComponents(app);
appService(app);

app.run(['$state', '$rootScope',
  function ($state, $rootScope) {
  }
]);

export default app;
