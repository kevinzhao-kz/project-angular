/**
 * app.js模块初始化
 * Created by leason on 2017/3/15.
 */
var angularApp = angular.module('starter', ['ngRoute','ui.router','ui.bootstrap','ui.bootstrap.tpls','ngAnimate','starter.services','toaster','chart.js']);

angularApp.run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        // $rootScope.title = toState.views.main.title;
    });
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){
            // 获取任何视图设置的参数，以及一个特殊的属性：viewConfig.targetView
    });
    $rootScope.$on('$viewContentLoaded', function(event, viewConfig){
        // 获取任何视图设置的参数，以及一个特殊的属性：viewConfig.targetView
    });
}]);
