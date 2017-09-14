var gulp = require('gulp'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    path = require('path');
    concat = require('gulp-concat');

gulp.task('templates', function(){
    gulp.src('app/**/templates/*.hbs',{base:'app'})
        .pipe(handlebars({compilerOptions:{compiler:7}}))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Handlebars.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('vendor/'));
});