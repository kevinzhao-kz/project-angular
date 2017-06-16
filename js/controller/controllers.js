/**
 *
 * Created by leason on 2017/3/20.
 */
// angularApp.controller('indexCtrl', ['$scope','webSocketServe','toaster',function($scope,webSocketServe,toaster) {
//     $scope.mem_labels = ["占用内存", "剩余内存"];
//     $scope.avg_labels = ["最近5分钟", "最近10分钟", "最近15分钟"];
//     $scope.avg_series = ['Series A'];
//     $scope.avg_onClick = function (points, evt) {
//         console.log(points, evt);
//     };
//     webSocketServe.webSocket(function (data) {
//         $scope.data = data;
//         //内存
//         $scope.mem_data = [data.data.totalmem-data.data.freemem, data.data.freemem];
//         //系统负载
//         $scope.avg_data = [
//             [data.data.loadavg[0], data.data.loadavg[1], data.data.loadavg[2]]
//         ];
//         $scope.$apply();
//         console.log(data);
//     });
//     $scope.test = function () {
//         console.log('fjk');
//         toaster.pop('success', "title", "text");
//     };
// }]);
angularApp.controller('indexCtrl', ['$scope','notesFactory',function($scope,notesFactory) {
    $scope.notes = notesFactory.get();
    $scope.createNote = function() {
        notesFactory.put($scope.note);
        $scope.note = '';
        $scope.notes = notesFactory.get();
    };
    // $http.get('../json/test.json').success(function(data){
    //     $scope.users = data;
    //     console.log(data);
    // });
    $scope.text = 'Hello World!';
}]);
