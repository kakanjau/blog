let OtherComponentsCtrl = ($scope, PreviewService) => {
  let vm = $scope;
  vm.showPreview = evt => {
    PreviewService.preview('http://b.hiphotos.baidu.com/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=97468a907fd98d1062d904634056d36b/34fae6cd7b899e51b628267841a7d933c8950d33.jpg', 'jpg');
    evt.stopPropagation();
    evt.preventDefault();
  };
};

OtherComponentsCtrl.$inject = ['$scope', 'PreviewService'];

export default app => app.controller('OtherComponentsCtrl', OtherComponentsCtrl);