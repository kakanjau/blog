export default app => {
  app.service('ArticleService', ['$http', 'storage', 'TreeToListService', 
    ($http, storage, TreeToListService) => {
      let articleMap;
      let service = {};
      
      service.init = () => {
        if(articleMap) {
          return articleMap;
        }else if(storage.get('article')){
          articleMap = {};
          articleMap.tree = storage.get('article');
          articleMap.list = TreeToListService.treeToList(articleMap.tree);
          return articleMap;
        }else {
          return $http.get('./articles/article-index.json').then(function(rsp, status){
            articleMap = {};
            articleMap.tree = rsp.data;
            articleMap.list = TreeToListService.treeToList(articleMap.tree);
          });
        }
      }
      
      service.getArticles = () => articleMap;
      
      service.getArticle = article => {
        $http.get(getArticlePath(article)).then(rsp => {
          article.content = rsp.data;
        });
      }
      
      function getArticlePath(article){
        let path = [article.name];
        let ext = article.fileExt;
        while(article.parent) {
          path.unshift(article.parent.name);
          article = article.parent;
        }
        path.unshift('./articles');
        return path.join('/') + '.' + ext;
      }
      
      return service;
    }
  ]);
}