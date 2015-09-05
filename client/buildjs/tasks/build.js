var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var sass = require('gulp-sass');
// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.appOutput, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.appOutput));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.appOutput, {extension: '.html'}))
    .pipe(gulp.dest(paths.appOutput));
});

// concat and minify CSS files
gulp.task('sass', function() {
  return gulp.src(paths.sass)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(paths.output+'styles'));
});


// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system','bundle', 'build-html', 'sass'],
    callback
  );
});

gulp.task('build-dev', function(callback) {
  return runSequence(
      'unbundle',
      'clean',
      ['build-system', 'build-html', 'sass'],
      callback
  );
});