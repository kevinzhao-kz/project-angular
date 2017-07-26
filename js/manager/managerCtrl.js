/**
 * manager模块controllers
 * Created by leason on 2017/7/3.
 */
angularApp.controller('blogEditCtrl', ['$scope','$uibModal','ajaxServe',function($scope,$uibModal,ajaxServe) {
    $scope.blogEdit = $scope;
    $scope.addInfo = function (e) {
        var type;
        console.log(e);
        if( e == 1){
            type = '分类';
        }else if(e == 0){
            type = '标签';
        }
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: "static",
            size: '',
            resolve: {
                inputData: function () {
                    return type;
                }
            }
        });
        modalInstance.result.then(function (inputValue) {
            console.log(inputValue);
            $scope.inputValue = inputValue;
        }, function () {
            console.log('aaa');
        });
    };

    $scope.addBlog = function () {
        var action = 'addBlog';
        var data = {
            title:$scope.blogEdit.title,
            class:$scope.blogEdit.class,
            type:$scope.blogEdit.type,
            tags:$scope.blogEdit.tags,
            text:$scope.text,
            introduction:$scope.blogEdit.introduction
        };
        console.log(data);
        ajaxServe.pubAjax(data,action,function () {

        });
    };
}]);
angularApp.controller('ModalInstanceCtrl', ['$scope','$uibModalInstance','inputData',function($scope,$uibModalInstance,inputData) {
    $scope.modal = $scope;
    $scope.title = inputData;
    $scope.ok = function () {
        $uibModalInstance.close($scope.modal.inputValue);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
