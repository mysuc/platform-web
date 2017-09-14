var gulp = require('gulp'),
    sequence = require('gulp-sequence');    // gulp 序列, 保证 task 执行顺序;

gulp.task('default', sequence(
    'clean',
    'sprites',      // 雪碧图
    'templates',    // Handlebars 模本
    // 下面的并发执行
    [
        'images',   // 图片
        'views',    // 视图
        'styles',   // 样式
        'scripts',   // js
        'config'   // js
    ],
    'ueditor'   // js
));