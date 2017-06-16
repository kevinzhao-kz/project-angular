/**
 *
 * Created by leason on 2017/3/15.
 */
var angularApp = angular.module('starter', ['ngRoute','ui.router','ngAnimate','starter.services','toaster','chart.js']);

angularApp.config(['$routeProvider','$stateProvider','$urlRouterProvider',function($routeProvider,$stateProvider,$urlRouterProvider) {
    // ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    $stateProvider
        .state('index', {
            url: '/index',
            // abstract: true,
            templateUrl: 'templates/index.html',
            controller: 'indexCtrl'
        });
    $urlRouterProvider.otherwise('/index');
}]);