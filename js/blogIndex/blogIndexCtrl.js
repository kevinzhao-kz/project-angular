/**
 * blogIndex模块controllers
 * Created by leason on 2017/7/3.
 */
angularApp.controller('blogIndexCtrl', ['$scope',function($scope) {
    console.log('测试');
}]);
angularApp.controller('blogListCtrl', ['$scope',function($scope) {
    console.log('测试');
}]);
angularApp.controller('blogArticleCtrl', ['$scope',function($scope) {
    $scope.text = '### 标题 - sfsds - sdfsd         ```var a=12;var a=12;var a=12;```';
}]);