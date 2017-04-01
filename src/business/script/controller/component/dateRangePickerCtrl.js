let DateRangePickerCtrl = ($scope) => {
  let vm = $scope;
  vm.dateOption1 = {
    opens: 'center',
    drops: 'up',
    canClear: true
  };
  vm.dateOption2 = {
    opens: 'center',
    drops: 'up',
    dateLimit: {
      'months': 1
    }
  };
  vm.dateOption3 = {
    opens: 'right',
    drops: 'up',
    ranges: {
        "今天": [
            "2016-03-01T07:47:44.964Z",
            "2016-03-01T07:47:44.964Z"
        ],
        "昨天": [
            "2016-02-29T07:47:44.964Z",
            "2016-02-29T07:47:44.964Z"
        ],
        "最近7天": [
            "2016-02-24T07:47:44.964Z",
            "2016-03-01T07:47:44.964Z"
        ],
        "最近30天": [
            "2016-02-01T07:47:44.964Z",
            "2016-03-01T07:47:44.964Z"
        ],
        "本月": [
            "2016-02-29T16:00:00.000Z",
            "2016-03-31T15:59:59.999Z"
        ],
        "上月": [
            "2016-01-31T16:00:00.000Z",
            "2016-02-29T15:59:59.999Z"
        ]
    }
  };
};

DateRangePickerCtrl.$inject = ['$scope'];

export default app => app.controller('DateRangePickerCtrl', DateRangePickerCtrl);