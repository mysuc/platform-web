var gulp = require('gulp'),
    del = require('del'),                           // 删除目录或文件
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    logger = require('gulp-logger'),                // 日志输出
    changed = require('gulp-changed'),              // 增量更新
    config = require('../config').config;            // 配置文件


// 配置文件
gulp.task('config', function() {
    return gulp.src(config.src, {base:config.base})
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(changed(config.dest)) // 增量更新
        .pipe(logger({beforeEach:'CHANGED CONFIG: '})) // 日志打印
        .pipe(gulp.dest(config.dest));
});


// 清理视图
gulp.task('config:clean', function() {
    return del([
        config.dest
    ]);
});