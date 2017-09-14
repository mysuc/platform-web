var gulp = require('gulp'),
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    config = require('../config').scripts;

gulp.task('ueditor', function () {
    gulp.src('ueditor/**/*')
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        .pipe(gulp.dest(config.dest));//输出到目录
});
