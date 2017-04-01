export default app => {
  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('Console', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        article: ['ArticleService', ArticleService => {
          return ArticleService.init()
        }]
      }
    })
    .state('Console.Portal', {
      url: '/',
      templateUrl: 'business/components/portal/temp.html'
    })
    .state('Console.Article', {
      url: '/article/:name',
      templateUrl: 'business/components/article/temp.html'
    })
    .state('Console.Category', {
      url: '/category?category',
      templateUrl: 'business/components/category/temp.html'
    })
    ;
  }]);
}