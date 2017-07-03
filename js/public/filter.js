/**
 *
 * Created by leason on 2017/6/15.
 */
angularApp.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);