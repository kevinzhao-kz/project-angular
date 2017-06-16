/**
 *
 * Created by leason on 2017/6/15.
 */
angularApp.directive('aGreatEye', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
    };
});