//ş
'use strict';

var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint');

gulp.task('jscs', function () {
    return gulp.src(['./src/**/*.js', './gulpfile.js'])
            .pipe(jscs())
            .pipe(jscs.reporter());
});

gulp.task('fixcs.src', function () {
    return gulp.src('./src/**/*.js')
        .pipe(jscs({ fix: true }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('./src'));
});

gulp.task('fixcs.gulpfile', function () {
    return gulp.src('./gulpfile.js')
        .pipe(jscs({ fix: true }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('.'));
});

gulp.task('fixcs', ['fixcs.src', 'fixcs.gulpfile']);

gulp.task('jshint', function () {
    return gulp.src('./src/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jscs', 'jshint']);
