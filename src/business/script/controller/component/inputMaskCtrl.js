let InputMaskCtrl = ($scope) => {
  let vm = $scope;
  vm.validateInput = (inputValList, mask) => {
    let ret = true;
    for(let p in inputValList){
      ret = ret && Number.isInteger(+inputValList[p]);
    }
    return ret;
  };
};

InputMaskCtrl.$inject = ['$scope'];

export default app => app.controller('InputMaskCtrl', InputMaskCtrl);