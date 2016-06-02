var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

var jsSource = [
	'./assets/scripts/core/*.js'
];
var tsSource = ['./assets/scripts/**/*.ts'];
var styleSource = ["./assets/styles/*.scss"];

var jsTarget = './dist/';
var cssTarget = './dist/';


gulp.task('compileTS', function() {
  return gulp.src(tsSource)
  	.pipe(ts({ out:'appts.js'}))
    // .pipe(uglify())
    .pipe(gulp.dest(jsTarget))
    .pipe(livereload());
});

gulp.task('compileJS', function() {
  return gulp.src(jsSource)
    .pipe(concat('./app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsTarget))
    .pipe(livereload());
});

gulp.task('compileCSS', function() {
  return gulp.src(styleSource)
  	.pipe(sass().on('error',sass.logError))
  	.pipe(concat('./main.css'))
    .pipe(gulp.dest(cssTarget))
    .pipe(livereload());
});


gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(styleSource,['compileCSS']);
	gulp.watch(jsSource,['compileJS']);
	gulp.watch(tsSource,['compileTS']);
	gulp.watch('./index.html',function(){
		livereload.reload('./index.html');
	});
});