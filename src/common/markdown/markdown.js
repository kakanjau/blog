import marked from 'marked';

function isTopMarkdownEle(ele) {
  return ele.parents('markdown, [markdown]').length == 0
}

export default app => {
  app.directive("markdown", [function () {
    return {
      restrict: "AE",
      priority: 1,
      // scope: {
      //   content: '=',
      //   option: '='
      // },
      link: function (scope, element, attrs) {
        attrs.option && marked.setOptions(JSON.parse(attrs.option));
        if(isTopMarkdownEle(element)){
          element[0].classList.add('markdown');
          if (attrs.content) {
            element.html(marked((attrs.content || '').toString()));
          } else {
            element.html(marked(element.html().replace(/&gt;/g, '>')));
          }
        }
      }
    };
  }])
}
