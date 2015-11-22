var gulp = require("gulp");
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var ejs = require("gulp-ejs");

gulp.task('sass', function(){
	gulp.src('./_src/scss/*.scss')
	.pipe(plumber())
	.pipe(sass({
		style:'expanded'
	}))
	.pipe(pleeease({
		autoprefixer:{
			browsers:['last 2 versions']
		},
		minifier: false
	}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(reload({stream: true}));
});
gulp.task('server',function(){
	browserSync({
		notify:false,
		server:{
			baseDir:"./dist",
			directory: true,
		}
	});
});

gulp.task('watch',function(){

	gulp.watch('_src/scss/*.scss',['sass']);
	// gulp.watch('./_src/**/*.html',['minify-html']);
	gulp.watch('dist/*.html',reload);
});
gulp.task('default',['server','watch']);
