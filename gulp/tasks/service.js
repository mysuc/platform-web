var gulp = require('gulp'),
    connect = require('gulp-connect'),              // web service
    config = require('../config').service;            // 配置文件

gulp.task('start', ['watch'], function() {
    connect.server(config);
});
