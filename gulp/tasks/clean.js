var gulp = require('gulp');

// 并发执行 clean
gulp.task('clean', [
    'sprites:clean',    // 雪碧图
    'images:clean',     // 图片
    'views:clean',      // 视图
    'styles:clean',     // css
    'scripts:clean',    // js
]);