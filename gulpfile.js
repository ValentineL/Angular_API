'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('sass', function () {
    return gulp.src('./**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('jshint', function() {
    return gulp.src(['app/app.js','tests/app.test.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {
     gulp.src(['app/app.js','tests/app.test.js'])
        .pipe(uglify())
        .pipe(gulp.dest('minified'));
});

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('./**/*.sass', ['sass']);
});

gulp.task('default', ['sass', 'jshint', 'uglify', 'watch']);