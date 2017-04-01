import content from '../../../../README.md';

let PortalCtrl = function($scope, $timeout) {
  let vm = $scope;
  vm.mdContent = content;
}

PortalCtrl.$inject = ['$scope', '$timeout'];

export default app => app.controller('PortalCtrl', PortalCtrl);