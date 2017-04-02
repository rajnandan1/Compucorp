var connect = require('connect');
var serveStatic = require('serve-static');

var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('hello', function() {
  console.log('Hello Zell');
});
gulp.task('sass', function(){
  return gulp.src('app/resources/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/resources/css'))
});
gulp.start('sass')
connect().use(serveStatic(__dirname+'/app')).listen(8080, function(){
    console.log('Server running on 8080...');
});