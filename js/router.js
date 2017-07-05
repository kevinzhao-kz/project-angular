/**
 * router文件
 * Created by leason on 2017/7/3.
 */
angularApp.config(['$routeProvider','$stateProvider','$urlRouterProvider','$locationProvider',function($routeProvider,$stateProvider,$urlRouterProvider,$locationProvider) {
    // ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('main', {
            url: '/main',
            views: {
                'index': {
                    templateUrl: 'templates/main.html',
                    controller: 'mainCtrl'
                }
            }
        })
        .state('main.index', {
            url: '/index',
            views: {
                'main': {
                    title:"我就是我，不一样的烟火",
                    templateUrl: 'templates/index.html',
                    controller: 'indexCtrl'
                }
            }
        })
        .state('main.test', {
            url: '/test',
            views: {
                'main': {
                    title:"test页面",
                    templateUrl: 'templates/test.html',
                    controller: 'testCtrl'
                }
            }
        })
        .state('main.grid', {
            url: '/grid',
            views: {
                'main': {
                    title:"grid页面",
                    templateUrl: 'templates/grid.html',
                    controller: 'gridCtrl'
                }
            }
        })
        .state('main.gridEdit', {           //tab下面的命名包含tab本身，方便sidebar定位
            url: '/gridEdit',
            params:{data:null},
            views: {
                'main': {
                    title:"gridEdit页面",
                    templateUrl: 'templates/gridEdit.html',
                    controller: 'gridEditCtrl'
                }
            }
        })
        .state('info', {
            url: '/info',
            views: {
                'index': {
                    title:"info页面",
                    templateUrl: 'templates/info.html',
                    controller: 'infoCtrl'
                }
            }
        })
        .state('main.md', {
            url: '/md',
            views: {
                'main': {
                    title:"md页面",
                    templateUrl: 'templates/md.html',
                    controller: 'mdCtrl'
                }
            }
        })
        //blog
        .state('blogIndex', {
            url: '/blogIndex',
            views: {
                'index': {
                    title:"blog页面",
                    templateUrl: 'templates/blogIndex/blogIndex.html',
                    controller: 'blogIndexCtrl'
                }
            }
        })
        .state('blogIndex.list', {
            url: '/list',
            views: {
                'blog': {
                    title:"blog list页面",
                    templateUrl: 'templates/blogIndex/blogList.html',
                    controller: 'blogListCtrl'
                }
            }
        })
        .state('blogIndex.article', {
            url: '/article',
            views: {
                'blog': {
                    title:"blog article页面",
                    templateUrl: 'templates/blogIndex/blogArticle.html',
                    controller: 'blogArticleCtrl'
                }
            }
        })
        .state('blogIndex.blogEdit', {
            url: '/blogEdit',
            views: {
                'blog': {
                    title:"blogEdit页面1",
                    templateUrl: 'templates/manager/blogEdit.html',
                    controller: 'blogEditCtrl'
                }
            }
        })
        ;
    $urlRouterProvider.otherwise('/blogIndex/list');
}]);