let ModalCtrl = function($scope, AlertService, DialogService) {
  let vm = $scope;
  vm.showAlert = () => {
    AlertService.alert({
      title: 'alert',
      content: '内容可以内嵌html标签，通过<span class="text-danger">class</span>添加式样。<br>以达到模态框复用的效果'
    })
  };
  
  vm.showConfirm = () => {
    AlertService.confirm({
      title: 'confirm',
      content: 'confirm有<span class="text-danger">确认</span>和取消按钮，通过promise对确认、取消进行后处理。<br>请打开控制台查看OK和CANCEL的后处理'
    }).then(() => {
      console.info('confirm OK');
    }, () => {
      console.info('confirm CANCEL');
    })
  };
  
  vm.showDialog = () => {
    DialogService.modal({
      key: 'dialogDemo',
      url: 'business/template/component/modal/dialogDemo.html',
      accept: (result) => {
        console.log(result);
      },
      refuse: (reason) => {
        console.log(reason);
      }
    }, {
      key: 'dialogDemo',
      data: {msg: 'this is data from modalCtrl!'}
    });
  };
};

ModalCtrl.$inject = ['$scope', 'AlertService', 'DialogService'];

export default app => app.controller('ModalCtrl', ModalCtrl);