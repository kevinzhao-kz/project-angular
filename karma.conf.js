// Karma configuration
// Generated on Wed Jun 14 2017 14:17:40 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // "libs/angular.min.js",
      // "libs/angular-animate.js",
      // "libs/angular-md5.min.js",
      // "libs/angular-route.min.js",
      // "libs/angular-ui-router.min.js",
      // "libs/jquery-1.9.1.min.js",
      // "libs/bootstrap.min.js",
      // "libs/toaster.min.js",
      // "libs/socket.io.min.js",
      "bower_components/angular/angular.js",
      "libs/socket.io.min.js",
      "node_modules/chart.js/dist/Chart.min.js",
      "node_modules/angular-chart.js/dist/angular-chart.min.js",
      "bower_components/angular-animate/angular-animate.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/angular-ui-router/release/angular-ui-router.js",
      "bower_components/angular-md5/angular-md5.js",
      "bower_components/jquery/dist/jquery.js",
      "bower_components/bootstrap/dist/js/bootstrap.js",
      "bower_components/AngularJS-Toaster/toaster.js",
      "bower_components/angular-mocks/angular-mocks.js",
      // 'libs/*.js',
      'js/*.js',
      'js/**/*.js',
      'unitTest/test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
