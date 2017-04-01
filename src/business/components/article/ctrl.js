let ctrl = ($scope, $stateParams, $document, $uiViewScroll, ArticleService) => {
  let articleMap = ArticleService.getArticles();
  $scope.doc = $document[0];
  $scope.articleList = articleMap.list.filter((article, index) => {
    if(!article.isFolder) {
      article.id = 'article' + index;
      return true; 
    }
  });
  $scope.articleList.some(article => {
    if(article.name == $stateParams.name){
      $scope.article = article;
      return true;
    }
  });
  
  $scope.$on('sn.select2.select', (evt, article) => {
    // location.href = "#/article/"+$scope.article.text;
    $state.go('Console.Article', {name: $scope.article.text}, {reload: true});
  });
  ArticleService.getArticle($scope.article);
  $uiViewScroll($document.find('body'));
};

ctrl.$inject = ['$scope', '$stateParams', '$document', '$uiViewScroll', 'ArticleService'];

export default app => app.controller('ArticleCtrl', ctrl);