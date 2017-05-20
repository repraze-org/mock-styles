var fs      = require('fs');
var path    = require('path');

var gulp    = require('gulp');
var merge   = require('merge-stream');
var watch   = require('gulp-watch');
var plumber = require('gulp-plumber');
var header  = require('gulp-header');
var rename  = require('gulp-rename');

var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var cleanCSS        = require('gulp-clean-css');

// Globals

const options = {
    plumber : function(err){
        if(!process.env.CI){
            console.log(err);
            this.emit('end');
        };
    }
};

// Default, used by Travis CI

gulp.task('default', ['build-demo']);

// Demo tasks

gulp.task('build-demo', function(){
    return gulp.src('./demo/*.less')
        .pipe(plumber(options.plumber))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./demo/'));
});

// Watcher

gulp.task('watch', function () {
    gulp.watch('./demo/**/*.less', ['build-demo']);
});
