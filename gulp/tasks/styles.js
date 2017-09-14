var gulp = require('gulp'),
    sass = require('gulp-sass'),                    // sass 处理
    sourcemaps = require('gulp-sourcemaps'),        // sourcemap
    autoprefixer = require('gulp-autoprefixer'),    // 样式自动加 hack (css 前缀)
    concat = require('gulp-concat'),                // 文件合并
    cleanCSS = require('gulp-clean-css'),           // 样式压缩
    md5 = require("gulp-md5-plus"),                 // 文件名加 md5 后缀
    del = require('del'),                           // 删除目录或文件
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    config = require('../config').styles;           // 配置文件

gulp.task('styles',['styles:vendor'],function () {
    return gulp.src(config.app.src)
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(sourcemaps.init())
        .pipe(sass()) // 编译 sass 文件
        .pipe(autoprefixer()) // 样式自动加 hack (css 前缀)
        .pipe(sourcemaps.write())
        .pipe(concat('app.css')) // 合并为一个文件
        .pipe(gulp.dest(config.dest));
});

gulp.task('styles:vendor', function () {
    return gulp.src(config.vendor.src)
        .pipe(concat('vendor.css')) // 合并为一个文件
        .pipe(gulp.dest(config.dest));
});

gulp.task('styles:build', ['styles:build:vendor'], function () {
    return gulp.src(config.app.src)
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(sass()) // 编译 sass 文件
        .pipe(autoprefixer()) // 样式自动加 hack (css 前缀)
        .pipe(concat('app.css')) // 合并为一个文件
        .pipe(cleanCSS({compatibility:'ie8'})) // 压缩样式
        .pipe(md5(10,'bin/views/layout.html'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('styles:build:vendor', function () {
    return gulp.src(config.vendor.src)
        .pipe(sass()) // 编译 sass 文件
        .pipe(cleanCSS()) // 压缩样式
        .pipe(concat('vendor.css')) // 合并为一个文件
        .pipe(cleanCSS({compatibility:'ie8'})) // 压缩样式
        .pipe(md5(10,'bin/views/layout.html'))
        .pipe(gulp.dest(config.dest));
});


// 清理样式
gulp.task('styles:clean', function() {
    return del([
        config.dest
    ], {force: true});
});