const gulp = require('gulp');
var concatJs = require('gulp-concat');
const minify = require('gulp-minify');
 
gulp.task('default', function() {
  return gulp.src('src/**/*.js')
      .pipe(concatJs("/linter.js"))
      .pipe(gulp.dest('build'));
});

gulp.task('compress', function() {
    return gulp.src('src/**/*.js')
      .pipe(concatJs("/linter.js"))
      .pipe(minify())
      .pipe(gulp.dest('build'))
 });