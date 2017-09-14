var gulp = require('gulp'),
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    logger = require('gulp-logger'),                // 日志输出
    changed = require('gulp-changed'),      // 增量更新
    del = require('del'),                   // 删除目录
    imagemin = require('gulp-imagemin'),    // 压缩图片
    config = require('../config').images;   // 配置文件


// 图片复制
gulp.task('images', function() {
    return gulp.src(config.src,{base:config.base})
        .pipe(plumber(handleError)) // 去掉默认的管道错误处理,使用自定义的错误处理
        .pipe(changed(config.dest)) // 增量编译
        .pipe(logger({beforeEach:'CHANGED IMAGES: '})) // 打印日志
        .pipe(gulp.dest(config.dest));
});

// 图片复制 - build 版本，加了图片压缩
gulp.task('images:build', function() {
    return gulp.src(config.src,{base:config.base})
        .pipe(plumber(handleError)) // 去掉默认的管道错误处理,使用自定义的错误处理
        .pipe(changed(config.dest)) // 增量编译
        .pipe(imagemin()) // 压缩图片
        .pipe(logger({beforeEach:'Mining IMAGES: '})) // 打印日志
        .pipe(gulp.dest(config.dest));
});

// 清理图片
gulp.task('images:clean', function() {
    return del([
        config.dest
    ], {force:true});
});