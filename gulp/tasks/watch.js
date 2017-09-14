var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),              // web service
    config = require('../config');        // 配置文件

// 先执行一遍，在回调函数中监听变动
gulp.task('watch', ['default'], function() {
    // 监听指定文件的变动，然后出发指定子任务
    watch(config.views.src, function() {
        gulp.start('views');
    });
    watch(config.sprites.src, function() {
        gulp.start('sprites');
    });
    watch(config.scripts.app.src, function() {
        gulp.start('scripts');
    });
    watch(config.styles.app.src, function() {
        gulp.start('styles');
    });
    watch(config.images.src, function() {
        gulp.start('images');
    });
});