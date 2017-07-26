/**
 * 自动化打包压缩
 * Created by leason on 2017/4/26.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify'); //压缩
var concat = require('gulp-concat');//合并
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var bowerFiles = require('main-bower-files');

var paths = {
    js: ['./js/*.js', 'js/**/*.js'],
    css: ['./css/**/*.css'],
    templates: './js/templates.js',
    buildjs: ['./build/**/*.js'],
    buildcss: ['./build/**/*.css']
};

//代码语法检查命令--gulp jshint
var jshint = require('gulp-jshint');  //代码检查
gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//清除build文件夹命令--gulp clean
var del = require('del');
gulp.task('clean', function() {
    // 清除build文件夹和templates.js文件
    return del(['./build', paths.templates]);
});

//sass任务，执行编译sass任务
gulp.task('sass',function () {
    //编译scss文件把编译后的文件合并为css.css放入www/css文件夹中
    return gulp.src(['scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("css.css"))
        .pipe(gulp.dest("www/css"));
});

//合并html模板命令--gulp template
var templateCache = require('gulp-angular-templatecache');
gulp.task('template', function () {
    return gulp.src(['./templates/**/*.html','./templates/*.html'])
        .pipe(templateCache({module: 'templates'}))
        .pipe(gulp.dest('./js'))
});

//测试生产两种js压缩命令--生产gulp js --prod测试gulp js --dev
gulp.task('js',function(type) {
    console.log(type);
    if (type == 'dev') { // dev
        return gulp.src(paths.js)
            .pipe(concat('allS.js'))
            .pipe(gulp.dest('./build'));
    } else { // prod
        return gulp.src(paths.js)
            .pipe(sourcemaps.init())
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(concat('allS.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build'));
    }
});

//build_lib_js压缩库文件js
gulp.task('lib_js', function() {
    var lib_js_paths = [
        './bower_components/angular/angular.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-md5/angular-md5.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './bower_components/AngularJS-Toaster/toaster.min.js',
        './libs/socket.io.min.js',
        './node_modules/chart.js/dist/Chart.min.js',
        './node_modules/angular-chart.js/dist/angular-chart.min.js'
    ];
    return gulp.src(lib_js_paths)
        .pipe(sourcemaps.init())
        .pipe(concat('allLib.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));
});
//build_lib_css压缩库文件css
gulp.task('lib_css', function() {
    var lib_css_paths = [
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/AngularJS-Toaster/toaster.css'
    ];
    return gulp.src(lib_css_paths)
        .pipe(cssmin())
        .pipe(concat('allLib.min.css'))
        .pipe(gulp.dest('./build'));
});
//合并压缩css命令--gulp deployCSS
var cssmin = require('gulp-cssmin');
gulp.task('deployCSS',function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(concat('allS.css'))
        .pipe(gulp.dest('./build'));
});

//压缩图片资源
gulp.task('images', function () {
    return gulp.src('./img/*.*')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./build/img'));
});

//dev资源引用命令--gulp devIndex
gulp.task('devIndex', ['jshint','sass','lib_js', 'lib_css','deployCSS'], function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))

        // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});

//生产环境资源引用命令--gulp deployIndex
gulp.task('deployIndex', ['jshint', 'template', 'js', 'deployCSS','lib_js', 'lib_css'], function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.buildjs, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.buildcss, {read: false}), {relative: true}))
        // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});

//connect任务开启一个web调试服务，访问http://localhost:8080
var connect = require('gulp-connect');
gulp.task('connect', function () {
    connect.server({
        port:8080,
        livereload: true
    });
});

//watch任务，开启一个监控
gulp.task('watch', function () {
    //监控数组中文件的修改，如果有修改则执行reload任务
    gulp.watch(['scss/*.scss', 'index.html', 'templates/**/*.html', 'js/**/*.js', 'css/*/*','css/*.css'], ['deployIndex']);
});

gulp.task('default', ['connect', 'watch']);