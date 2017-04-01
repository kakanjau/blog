let Select2Ctrl = ($scope, HttpService) => {
  let vm = $scope;
  vm.ajaxSelectOption = {
    minimumInputLength: 2,
    ajax: {
      delay: 250,
      processResults: (data) => {
        data = (data || []);
        data.forEach(item => {
          item.id = item.no;
        });
        return {
          results: data
        };
      },
      transport: (params, success, failure) => {
        let delay = HttpService.get('/getRemoteSelectList.htm', params.data.q);
        delay.then(success, failure);
        return delay.promise;
      }
    },
    templateResult: item => {
      return item.loading ? item.text : (item.name || item.text)
    },
    templateSelection: item => {
      return item.loading ? item.text : (item.name || item.text)
    }
  };
};

Select2Ctrl.$inject = ['$scope', 'HttpService'];

export default app => app.controller('Select2Ctrl', Select2Ctrl);