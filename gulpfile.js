/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var dotenv = require('gulp-dotenv');
var rename = require('gulp-rename');

require('dotenv').config();
/*
if (result.error) {
  throw result.error
}

console.log(result.parsed)*/
/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('dotenv-ng', function () {
	gulp.src('.env')
    .pipe(dotenv())
    .pipe(rename('env.json'))
    .pipe(gulp.dest('.'));

  gulp.src('env.json')
  	.pipe(gulpNgConfig('env.config'))
  	.pipe(rename('env.config.js'))
  	.pipe(gulp.dest('./src/app'));

  console.log('dotenv-ng completed');
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean', 'dotenv-ng'], function () {
  gulp.start('build');
});
