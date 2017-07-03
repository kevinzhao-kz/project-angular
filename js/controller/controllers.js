/**
 * sidebar控制器
 * Created by leason on 2017/3/20.
 */
angularApp.controller('mainCtrl', ['$scope','$location','$rootScope',function($scope,$location,$rootScope) {
    //初始化
    var path = '#' + $location.path();
    $scope.init = function () {
        path = '#' + $location.path();
        $scope.getTab();
    };
    //side tab切换
    $scope.showSidebar = function (sidebar) {
        $scope.chooseSidebar = sidebar;
    };
    $scope.barChange = function (tab) {
        console.log(tab);
        $scope.chooseTab = tab;
    };
    $scope.getTab = function () {
        $scope.index = 0;
        angular.forEach($scope.sidebars, function(data,index,array) {
            $scope.index = index;
            angular.forEach(data.tabs, function(item) {
                if(path.indexOf(item.url) != -1){
                    $scope.showSidebar(data.firstName);
                    $scope.barChange(item.url);
                    return false;
                }
            });
        });
    };
    //sidebar数据
    $scope.sidebars = [
        {
            firstName:'index',
            icon:'fa fa-connectdevelop',
            tabs:[{
                url:'#/main/index',
                name:'index',
                icon:'fa fa-area-chart'
            },
            {
                url:'#/main/grid',
                name:'grid ',
                icon:'fa fa-area-chart'
            }]
        },
        {
            firstName:'test',
            icon:'fa fa-connectdevelop',
            tabs:[{
                url:'#/main/test',
                name:'test',
                icon:'fa fa-area-chart'
            },
            {
                url:'#/main/md',
                name:'md',
                icon:'fa fa-area-chart'
            }]
        }
    ];
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        console.log('监控路由');
        $scope.init();
    });
    $scope.init();
}]);
angularApp.controller('indexCtrl', ['$scope','webSocketServe','toaster',function($scope,webSocketServe,toaster) {
    $scope.mem_labels = ["占用内存", "剩余内存"];
    $scope.avg_labels = ["最近5分钟", "最近10分钟", "最近15分钟"];
    $scope.avg_series = ['Series A'];
    //内存
    $scope.mem_data = [1000, 800];
    //系统负载
    $scope.avg_data = [
        [0.2, 0.8, 0.4]
    ];
    $scope.avg_onClick = function (points, evt) {
        console.log(points, evt);
    };
    // webSocketServe.webSocket(function (data) {
    //     $scope.data = data;
    //     //内存
    //     $scope.mem_data = [data.data.totalmem-data.data.freemem, data.data.freemem];
    //     //系统负载
    //     $scope.avg_data = [
    //         [data.data.loadavg[0], data.data.loadavg[1], data.data.loadavg[2]]
    //     ];
    //     $scope.$apply();
    //     console.log(data);
    // });
    $scope.test = function () {
        console.log('fjk');
        toaster.pop('success', "title", "text");
    };
}]);
angularApp.controller('testCtrl', ['$scope','notesFactory',function($scope,notesFactory) {
    $scope.notes = notesFactory.get();
    $scope.createNote = function() {
        notesFactory.put($scope.note);
        $scope.note = '';
        $scope.notes = notesFactory.get();
    };
    $scope.text = 'Hello World!';
}]);
angularApp.controller('gridCtrl', ['$scope','$filter','toaster','$state',function($scope,$filter,toaster,$state) {
    $scope.$state = $state;
    var vm = $scope.vm = {};
    vm.page = {
        size: 5,
        index: 1
    };
    vm.items = [];
    vm.checkAll = function(checked) {
        angular.forEach(vm.items, function(item) {
            item.$checked = checked;
        });
    };
    vm.selection = function() {
        // return _.where(vm.items, {$checked: true});
        return $filter('filter')(vm.items,{$checked:true});
    };
    // 供页面中使用的函数
    vm.age = function(birthday) {
        return moment().diff(birthday, 'years');
    };
    //编辑数据
    vm.edit = function () {
        // alert(vm.selection().length);
        if(vm.selection().length == 1){
            $state.go('main.gridEdit', {data:vm.selection()}, {
                reload: true //下个页面不缓存 配合路由中cache使用
            });
        }else{
            toaster.pop('warning', "警告", "请选择一条记录！");
        }

    };
    //删除数据
    vm.delete = function () {
        // alert(vm.selection().length);
        angular.forEach(vm.selection(), function(item) {
            alert(item.name);
        });
    };

    // $scope.paginationConf = {
    //     currentPage: 1,
    //     itemsPerPage: 15
    // };
    // 通过$watch currentPage和itemperPage 当他们一变化的时候，重新获取数据条目
    // $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);
    // var reGetProducts = function(){
    //     console.log('test');
    // };
    // 配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 8000,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            console.log(this.currentPage);
        }
    };
    // 生成演示数据
    var MAX_NUM = 10;
    function rand(min, max) {
        return min + Math.round(Math.random() * (max-min));
    }
    for (var i = 0; i < MAX_NUM; ++i) {
        var id = rand(0, MAX_NUM);
        vm.items.push({
            id: i + 1,
            name: 'Name' + id, // 字符串类型
            followers: rand(0, 100 * 1000 * 1000), // 数字类型
            birthday: '2016-1-5', // 日期类型
            income: rand(1000, 100000) // 金额类型
        });
    }
}]);
angularApp.controller('gridEditCtrl', ['$scope','$stateParams',function($scope,$stateParams) {
    console.log($stateParams.data);
    var vm = $scope.vm = {
        show_error: false,
        show_type: 1,
        user: {}
    };

    vm.submit = function (basic_form) {
        vm.show_error = true;
        basic_form.$setDirty();
        if(basic_form.$valid){
            alert("提交成功！");
        }
    };

    vm.change_show_type = function (form) {
        if (vm.show_type == 2) {
            vm.show_error = true;
        } else {
            vm.show_error = false;
        }

        // 重置表单
        vm.user = {};
        form.$setPristine();

    };
}]);

angularApp.controller('mdCtrl', ['$scope',function($scope) {
    $scope.text='### 标题';
    $scope.toolbar=[
        {action:'bold',icon:'fa fa-bold',tip:'加粗(Ctrl+B)'},
        {action:'italic',icon:'fa fa-italic',tip:'斜体(Ctrl+I)'},
        {action:'header',icon:'fa fa-header',tip:'标题(Ctrl+H)'},
        {separator:true},
        {action:'ul',icon:'fa fa-list-ul',tip:'无序列表(Ctrl+U)'},
        {action:'ol',icon:'fa fa-list-ol',tip:'有序列表(Ctrl+O)'},
        {action:'code',icon:'fa fa-code',tip:'代码(Ctrl+K)'},
        {action:'quote',icon:'fa fa-quote-left',tip:'引用(Ctrl+Q)'},
        {separator:true},
        {action:'link',icon:'fa fa-link',tip:'连接(Ctrl+L)'},
        {action:'img',icon:'fa fa-picture-o',tip:'图片(Ctrl+G)'},
        {separator:true},
        {action:'undo',icon:'fa fa-undo',tip:'撤销'},
        {action:'redo',icon:'fa fa-repeat',tip:'重做'},
        {action:'preview',icon:'fa fa-eye',tip:'浏览'},
        {action:'fullscreen',icon:'fa fa-arrows-alt',tip:'全屏'}
    ];
    $scope.classNames={
        wrapper:'mdeditor',
        toolbar:'mdeditor-toolbar',
        toolbarItem:'mdeditor-toolbar-item',
        separator:'mdeditor-toolbar-separator',
        textarea:'mdeditor-textarea',
        preview:'mdeditor-preview'
    };
    $scope.shortcut={
        'Ctrl-B':'bold',
            'Ctrl-I':'italic',
            'Ctrl-H':'header',
            'Ctrl-U':'ul',
            'Ctrl-O':'ol',
            'Ctrl-K':'code',
            'Ctrl-Q':'quote',
            'Ctrl-L':'link',
            'Ctrl-G':'img'
    };
}]);
angularApp.controller('infoCtrl', ['$scope',function($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    $scope.data = {
        a:2,
        b:5,
        sum:1
    };
}]);