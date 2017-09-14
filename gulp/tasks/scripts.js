var gulp = require('gulp'),
    del = require('del'),                   // 删除目录
    coffee = require('gulp-coffee'),
    through = require('through2'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    concat = require('gulp-concat'),                // 文件合并
    md5 = require("gulp-md5-plus"),
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    logger = require('gulp-logger'),                // 日志输出
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),                    // 条件判断
    config = require('../config').scripts;


var pkg = {path: undefined};
gulp.task('scripts',['scripts:vendor'],function () {
    gulp.src(config.app.src,{base:config.app.base}) //main文件
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(gulpif(function(file) {
                if (file.path.indexOf('.coffee') != -1) {
                    return true;
                } else {
                    return false;
                }
            },
            coffee()))
        // .pipe(coffee())
        .pipe(through.obj(function(file,enc,cb) {
            var _relativePath = file.relative.replace(/\\/g,"/").replace(/\.[\s\S]+$/,"").replace(/^(views\/)/,"");
            var _suffix = _relativePath.split('/').pop();
            if (_suffix !== 'view') {
                _relativePath = _suffix;
            }
            pkg.path = _relativePath;
            this.push(file); // !!十分重要!!
            cb();
        }))
        .pipe(header('this.require.define({"${path}":function(exports, require, module){',pkg))
        .pipe(footer('}});'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.dest));//输出到目录
});

gulp.task('scripts:vendor', function () {
    gulp.src(config.vendor.src)
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.dest));//输出到目录
});

gulp.task('scripts:build',['scripts:build:vendor'],function () {
    gulp.src(config.app.src,{base:config.app.base}) //main文件
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(gulpif(function(file) {
                if (file.path.indexOf('.coffee') != -1) {
                    return true;
                } else {
                    return false;
                }
            },
            coffee()))
        // .pipe(coffee())
        .pipe(through.obj(function(file,enc,cb) {
            var _relativePath = file.relative.replace(/\\/g,"/").replace(/\.[\s\S]+$/,"").replace(/^(views\/)/,"");
            var _suffix = _relativePath.split('/').pop();
            if (_suffix !== 'view') {
                _relativePath = _suffix;
            }
            pkg.path = _relativePath;
            this.push(file); // !!十分重要!!
            cb();
        }))
        .pipe(header('this.require.define({"${path}":function(exports, require, module){',pkg))
        .pipe(footer('}});'))
        .pipe(concat('app.js'))
        .pipe(uglify()) //压缩 JS
        .pipe(md5(10,'bin/views/layout.html'))
        .pipe(gulp.dest(config.dest)); //输出到目录
});

gulp.task('scripts:build:vendor', function () {
    gulp.src(config.vendor.src)
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(concat('vendor.js'))
        .pipe(uglify()) //压缩 JS
        .pipe(md5(10,'bin/views/layout.html'))
        .pipe(gulp.dest(config.dest)); //输出到目录
});

// 清空编译目录
gulp.task('scripts:clean', function() {
    return del([
        config.dest
    ], {force:true});
});






