var gulp = require('gulp');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');

gulp.task('bundle', function(cb){
  exec('node_modules/.bin/aurelia bundle --force', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
gulp.task('unbundle', function(cb){
  exec('node_modules/.bin/aurelia unbundle ', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
