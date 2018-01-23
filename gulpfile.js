/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  require('dotenv').load();
}

var fs = require('fs'),
    gulp = require('gulp'),
    ngConfig = require('gulp-ng-config'),
    dotenv = require('gulp-dotenv'),
    rename = require('gulp-rename'),
    config = require('./config.js');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


gulp.task('ng-config', function() {
 fs.writeFileSync('./config.json',
      JSON.stringify(config[ENV]));
  gulp.src('./config.json')
    .pipe(
      ngConfig('env.config')
    )
    .pipe(gulp.dest('./src/app/scripts/'))
});

gulp.task('heroku:production', ['ng-config', 'build'], function(){
  console.log('herokuduction');
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'/* 'dotenv-ng'*/], function () {
  gulp.start('build');
});
