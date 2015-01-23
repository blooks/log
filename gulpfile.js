'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var through = require('through2');
var gutil = require('gulp-util');
var jsdoc2md = require('jsdoc-to-markdown');
var mfs = require('more-fs');


var files = ['lib/**/*.js'];
var tests = ['test/**/*.js'];
var alljs = files.concat(tests);


gulp.task('test', function() {
  return gulp.src(tests).pipe(new mocha({
    reporter: 'spec'
  }));
});

gulp.task('lint', function() {
  return gulp.src(alljs)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('jsdoc', function() {
  function jsdoc() {
    return through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }
      else if (file.isStream()) {
        cb(new gutil.PluginError('gulp-jsdoc2md', 'Streaming not supported'));
        return;
      }

      var destination = 'docs/api/' +
        file.path.replace(file.base, '').replace(/\.js$/, '.md');

      jsdoc2md.render(file.path, {})
        .on('error', function(err) {
          gutil.log(gutil.colors.red('jsdoc2md failed', err.message));
        })
        .pipe(mfs.writeStream(destination));

      cb(null, file);
    });
  }

  return gulp.src(files).pipe(jsdoc());
});

gulp.task('coverage', shell.task(
  ['node_modules/.bin/./istanbul cover node_modules/.bin/_mocha -- --recursive']
));

gulp.task('watch:test', function() {
  return gulp.watch(alljs, ['test']);
});

gulp.task('default', ['test', 'lint', 'jsdoc', 'coverage']);
