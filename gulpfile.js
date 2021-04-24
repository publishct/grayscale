'use strict';

var gulp = require('gulp')

var baseDir = "."
var targetDir = "."

var cleanCSS = require("gulp-clean-css");
gulp.task('css', () => {
    return gulp.src(baseDir + '/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(targetDir));
});

var rename = require('gulp-rename')
var babel = require('gulp-babel');
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')

gulp.task('js', function () {
    return gulp.src(baseDir + "/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('concat.js')) //this will concat all the files into concat.js
        .pipe(gulp.dest(baseDir + "/concat")) //this will save concat.js in a temp directory defined above
        .pipe(rename('index.js')) //this will rename concat.js to index.js
        .pipe(uglify()) //this will uglify/minify uglify.js
        .pipe(gulp.dest(targetDir + "/js"));
})
