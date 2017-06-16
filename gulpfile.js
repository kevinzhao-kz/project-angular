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
//合并html模板命令--gulp template
var templateCache = require('gulp-angular-templatecache');
gulp.task('template', function () {
    return gulp.src(['./templates/**/*.html','./templates/*.html'])
        .pipe(templateCache({module: 'templates'}))
        .pipe(gulp.dest('./js'))
});
//测试生产两种js压缩命令--生产gulp js --prod测试gulp js --dev
gulp.task('js', function(type) {
    console.log(type);
    if (type == 'dev') { // dev
        return gulp.src(paths.js)
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./build'));
    } else { // prod
        return gulp.src(paths.js)
            .pipe(sourcemaps.init())
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build'));
    }
});
//合并压缩css命令--gulp deployCSS
var cssmin = require('gulp-cssmin');
gulp.task('deployCSS', function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build'));
});
//dev资源引用命令--gulp devIndex
gulp.task('devIndex', ['clean', 'jshint'], function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
        // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});
//生产环境资源引用命令--gulp deployIndex
gulp.task('deployIndex', ['clean', 'jshint', 'template', 'js', 'deployCSS'], function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.buildjs, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.buildcss, {read: false}), {relative: true}))
        // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});