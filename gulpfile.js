var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');

gulp.task('sass', function () {
	gulp.src('public/stylesheets/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(pleeease({
      autoprefixer: { 'browsers': ['last 2 versions', 'ie 6', 'ie 7', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4'] },
      minifier: false
    }))
	.pipe(gulp.dest('public/stylesheets'))
	.pipe(reload({stream:true}));
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null,{
		files:["public/**/*.*"],
		proxy:'http://localhost:3000',
		port:4000,
		open:false
	});
});

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch("public/stylesheets/*.scss", ['sass']);
	gulp.watch(["public/javascripts/*.js", "views/*.ejs"], reload);
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		script: 'bin/www',
		ignore:['public/javascripts/*.js']
	}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});
