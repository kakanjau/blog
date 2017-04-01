let ConsoleCtrl = function ($scope, $state) {
  let vm = $scope;
  let globals = {
    stateAndMenus: {}
  };
  vm.formData = {};
  vm.menus = [
    {
      name: '概览',
      state: 'Console.Portal',
      clazz: 'fa fa-dashboard'
    }, {
      name: 'common组件',
      clazz: 'fa fa-laptop',
      children: [
        {
          name: '树',
          state: 'Console.Component.Tree'
        }, {
          name: '模态框',
          state: 'Console.Component.Modal'
        }, {
          name: 'echarts图表',
          state: 'Console.Component.Echarts'
        }, {
          name: '日期范围选择',
          state: 'Console.Component.DateRangePicker'
        }, {
          name: 'Mask',
          state: 'Console.Component.InputMask'
        }, {
          name: 'select2',
          state: 'Console.Component.Select2'
        }, {
          name: '其他组件',
          state: 'Console.Component.OtherComponents'
        }, {
          name: '基础服务',
          state: 'Console.Component.OtherServices'
        }]
    }, {
      name: 'table',
      clazz: 'fa fa-table',
      children: [
        {
          name: '普通table',
          state: 'Console.Table'
        }, {
          name: '可编辑table',
          state: 'Console.EditTable'
        }]
    }, {
      name: 'form',
      clazz: 'fa fa-edit',
      children: [
        {
          name: '普通form',
          state: 'Console.Form'
        }, {
          name: '表单验证form',
          state: 'Console.ValidateForm'
        }]
    }, {
      name: 'tab',
      state: 'Console.Tab',
      clazz: 'fa fa-th'
    }];
  init();
  
  ////////////////$scope functions/////////////////
  vm.selectMenu = function (e, menuItem) {
    e.preventDefault();
    e.stopPropagation();
    var stateName = menuItem.state,
      stateParam = menuItem.param;
    if (stateName) {
      //当使用reload:true时会重新生成一个scope,init方法都会再次执行
      $state.go(menuItem.state, stateParam, { reload: true });
    } else {
      if (formData['selectedMenu' + menuItem.level] === menuItem) {
        formData['selectedMenu' + menuItem.level] = null;
      } else {
        formData['selectedMenu' + menuItem.level] = menuItem;
      }

      while (menuItem.parent) {
        menuItem = menuItem.parent;
        formData['selectedMenu' + menuItem.level] = menuItem;
      }
    }
  };

  vm.doLogout = function () {
  };

  ///////////////////watches//////////////////////////////
  ///////////////////Events///////////////////
  $scope.$on('router:state:change', function (event, toState) {
    event.preventDefault();
    locateMenu(toState);
  });

  function reCfgMenus(menus, parent, level) {
    menus.forEach(function (v) {
      var child = v.children;
      if (Array.isArray(child)) {
        reCfgMenus(child, v, level + 1);
      }
      v.parent = parent;
      v.level = level;
    });
  }
    
  //router state与菜单映射关系
  function bulidStateAndMenuInfo(menus, result) {
    result = result || {};
    menus.forEach(function (v) {
      //如出现重复state则  throw error
      if (result[v.state]) {
        throw new Error(v.state + ' state is already exists');
      }

      if (typeof v.state === 'string') {
        result[v.state] = v;
      }

      //关系
      if (Array.isArray(v.relation)) {
        v.relation.forEach(function (item) {
          result[item] = v;
        })
      }

      if (Array.isArray(v.children)) {
        bulidStateAndMenuInfo(v.children, result);
      }
    });
  }

  function selectedMenu(stateName) {
    var menu;
    vm.formData.selectedMenu1 = null;
    vm.formData.selectedMenu2 = null;
    vm.formData.selectedMenu3 = null;

    if (stateName) {
      menu = globals.stateAndMenus[stateName];
      while (menu) {
        vm.formData['selectedMenu' + menu.level] = menu;
        menu = menu.parent;
      }
    }
  }

  function locateMenu(state) {
    selectedMenu(state.name);
  }

  function init() {
    reCfgMenus(vm.menus, null, 1);
    bulidStateAndMenuInfo(vm.menus, globals.stateAndMenus);
    locateMenu($state.current);

    vm.now = new Date;
  }
}

ConsoleCtrl.$injector = ['$scope', '$state'];
export default app => app.controller('ConsoleCtrl', ConsoleCtrl);