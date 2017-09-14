var gulp = require('gulp'),
    sequence = require('gulp-sequence');    // gulp 序列, 保证 task 执行顺序

// 顺序执行
gulp.task('build', sequence(
    'clean',
    'config:clean',      // CONFIG
    'sprites',
    'templates',    // Handlebars 模本
    'views:build',
    // 下面的并发执行
    [
        'styles:build',
        'scripts:build',
        'images:build',
        'config'
    ],
    'ueditor'   // js
));
