let ctrl = ($scope, $document, $uiViewScroll, ArticleService) => {
  $scope.selectOption = {
    placeholder: '搜索文章',
    allowClear: true
  };
  let articleMap = ArticleService.getArticles();
  $scope.articleList = articleMap.list.filter((article, index) => {
    if(!article.isFolder) {
      article.id = 'article' + index;
      return true; 
    }
  }).sort((pre, next) => {
    return new Date(next.updateDate) - new Date(pre.updateDate)
  });
  
  $document.bind('scroll', evt => {
    let rect = document.body.getBoundingClientRect();
    if(rect.bottom - document.documentElement.clientHeight < 200) {
      let max = ($scope.scrollPage+1) * $scope.pageSize;
      if(max < $scope.articleList.length) {
        $scope.$apply(() => {
          $scope.scrollPage++;
        });
      }
    }
  });
  
  $scope.$watch('artSelect', newVal => {
    if(newVal && !newVal.content) {
      ArticleService.getArticle(newVal);
    }
  });
  
  $scope.$watch('scrollPage', newVal => {
    let max = (newVal+1) * $scope.pageSize;
    while(loadingArticleCount < max) {
      ArticleService.getArticle($scope.articleList[loadingArticleCount++]);
    }
  });
  
  $scope.triggerWholeArticle = (article) => {
    article.showWhole = !article.showWhole;
    let ele = $(`#${article.id} .box-body`);
    if(!article.showWhole) {
      document.body.scrollTop = document.body.scrollTop + article.hideHeight - ele.height();
    }else{
      article.hideHeight = ele.height();
    }
  };
  
  let loadingArticleCount = 0;
  $scope.scrollPage = 0;
  $scope.pageSize = 3;
};

ctrl.$inject = ['$scope', '$document', '$uiViewScroll', 'ArticleService'];

export default app => app.controller('PortalCtrl', ctrl);