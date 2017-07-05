/**
 * manager模块controllers
 * Created by leason on 2017/7/3.
 */
angularApp.controller('blogEditCtrl', ['$scope','$uibModal',function($scope,$uibModal) {
    console.log('测试');
    alert('aaa');
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.aaa = function (size) {
        alert('bbb');
        console.log('sdsds');
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: "static",
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}]);
angularApp.controller('ModalInstanceCtrl', ['$scope','$uibModalInstance','items',function($scope,$uibModalInstance,items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
