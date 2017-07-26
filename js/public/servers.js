/**
 *
 * Created by leason on 2017/3/20.
 */
angular.module('starter.services', [])
.factory('ajaxServe',['$http', function($http) {
    return {
        pubAjax:function(data,action,callback){
            $http({
                url:'http://127.0.0.1:3000/'+action,
                // url:'json/test.json',
                method:'post',
                dataType: 'json',
                ContentType:'application/json',
                data:{
                    "data":data
                }
            }).success(function(data){
                if(data.status == "0"){
                    alert('操作成功');
                    return callback(data);
                }else{
                    alert('操作失败');
                }
            }).error(function(data){
                alert('网络错误');
            });
        }
    };
}])
.factory('webSocketServe',[function() {
    return {
        webSocket:function(callback){
            var socketList = io('ws://localhost:3000/manager');
            // var socketList = io('ws://10.10.61.26:443/manager');
            socketList.on('connected', function (data) {
                socketList.emit('login', {name: 'leason',ssid:'15133',appkey:'leason'});
            });
            socketList.on('info', function (data) {
                callback(data);
            });
        }
    };
}])
.factory('notesFactory', [function() {
    return {
        put: function(note) {
            localStorage.setItem('todo' + (Object.keys(localStorage).length + 1), note);
        },
        get: function() {
            var notes = [];
            var keys = Object.keys(localStorage);

            for(var i = 0; i < keys.length; i++) {
                notes.push(localStorage.getItem(keys[i]));
            }

            return notes;
        }
    };
}])
.factory('httpReq', ['$http', function($http) {
    return {
        sendMessage: function() {
            $http.get('http://it-ebooks-api.info/v1/search/JavaScript');
        }
    };
}]);
    