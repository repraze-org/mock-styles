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

const pkg = JSON.parse(fs.readFileSync('package.json'));

const options = {
    input   : './less/*.less',
    output  : './',
    suffix  : '.min',
    plumber : function(err){
        if(!process.env.CI){
            console.log(err);
            this.emit('end');
        };
    },
    clean   : {
        format:{
            breaks:{
                afterComment:true
            }
        }
    },
    header  : [
        '/*!',
        ' * <%= name %> v<%= version %> (<%= homepage %>)',
        ' * Copyright 2017-<%= new Date().getFullYear() %> <%= author %>',
        ' * Licensed under the <%= license %> (http://opensource.org/licenses/<%= license %>)',
        ' */',
    '',''].join('\n'),
};

// Default, used by Travis CI

gulp.task('default', ['build-less']);

// Build tasks

gulp.task('build-less', function(){
    var base = function(){
        return gulp.src(options.input)
            .pipe(plumber(options.plumber))
            .pipe(less())
            .pipe(autoprefixer());
    };

    var extended = base()
        .pipe(header(options.header, pkg))
        .pipe(gulp.dest(options.output));

    var minified = base()
        .pipe(cleanCSS(options.clean))
        .pipe(header(options.header, pkg))
        .pipe(rename({suffix: options.suffix}))
        .pipe(gulp.dest(options.output));

    return merge(extended, minified);
});

// Watcher

gulp.task('watch', function () {
    gulp.watch('./less/**/*.less', ['build-less']);
});
