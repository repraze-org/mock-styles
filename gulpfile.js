var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('watch', function () {
    gulp.watch('./less/**/*.less', ['build-less']);
});

gulp.task('build-less', function(){
    return gulp.src('./less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css/'));
});
