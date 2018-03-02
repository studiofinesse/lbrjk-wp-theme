/* -------------------------
	Plugins
------------------------- */

var fs 		      = require('fs'),
	gulp          = require('gulp'),
	autoprefixer  = require('gulp-autoprefixer'),
	cache		  = require('gulp-cache'),
	combinemq	  = require('gulp-combine-mq'),
	minify        = require('gulp-clean-css'),
	imagemin      = require('gulp-imagemin'),
	include       = require('gulp-include'),
	notify        = require('gulp-notify'),
	rename        = require('gulp-rename'),
	sass          = require('gulp-sass'),
	sequence	  = require('gulp-sequence'),
	sourcemaps    = require('gulp-sourcemaps'),
	strip         = require('gulp-strip-debug'),
	uglify        = require('gulp-uglify'),
	gutil         = require('gulp-util'),
	browserSync   = require('browser-sync'),
	del           = require('del');

/* -------------------------
	General
------------------------- */

// Errors
var reportError = function (error) {
	var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

	notify({
		title: 'Task Failed [' + error.plugin + ']',
		message: lineNumber + 'See console.',
		sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).write(error);

	gutil.beep(); // Beep 'sosumi' again

	// Inspect the error object
	//console.log(error);

	// Easy error reporting
	//console.log(error.toString());

	// Pretty error reporting
	var report = '';
	var chalk = gutil.colors.white.bgRed;

	report += '------------------------------------------------------------\n';
	report += chalk('TASK:') + ' [' + error.plugin + ']\n';
	report += chalk('PROB:') + ' ' + error.messageOriginal + '\n';
	report += chalk('FILE:') + ' ' + error.relativePath + '\n';
	report += chalk('LINE:') + ' ' + error.line + '\n';
	report += '------------------------------------------------------------';
	if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
	if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
	console.error(report);

	// Prevent the 'watch' task from stopping
	this.emit('end');
};

/* -------------------------
	Tasks
------------------------- */

// Clean
gulp.task('clean', function(){
	return del([
		'__packaged',
		'__packaged/**',
		'dist/**',
	]);
});

// Styles
gulp.task('styles', function() {

	var production = this.seq.indexOf('build') != -1;

	return gulp.src('src/styles/**/*.scss')
		.pipe(production ? gutil.noop() : sourcemaps.init())
		.pipe(sass({outputStyle: 'compact'})).on('error', reportError)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(combinemq())
		.pipe(production ? minify() : gutil.noop())
		.pipe(production ? gutil.noop() : sourcemaps.write())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({ message: 'TASK: "styles" Completed! 💯', onLast: true }));
});

// Scripts
gulp.task('scripts', function() {

	var production = this.seq.indexOf('build') != -1;

	return gulp.src('src/js/*.js')
		.pipe(include()).on('error', console.log)
		.pipe(production ? strip() : gutil.noop())
		.pipe(production ? uglify() : gutil.noop())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({ message: 'TASK: "scripts" Completed! 💯', onLast: true }));
});

// Images
gulp.task('images', function(){
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}]
		})))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({ message: 'TASK: "images" Completed! 💯', onLast: true }));
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
		.pipe(notify({ message: 'TASK: "fonts" Completed! 💯', onLast: true }));
});

// Watch
gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/img/**/*', ['images']);
});

// Default
gulp.task('default', ['styles', 'scripts', 'images', 'fonts'], function() {
	gulp.start('watch');
});

/* -------------------------
	BrowserSync
------------------------- */

gulp.task('reload-styles', ['styles'], function() {
	browserSync.reload('dist/css/main.min.css');
});

gulp.task('reload-scripts', ['scripts'], function() {
	browserSync.reload('dist/scripts/main.js');
});

gulp.task('serve', ['default'], function() {
	var opts;

	try {
		opts = require('./browserSync.json');
	} catch (error) {
		return;
	}

	browserSync.init(Object.assign(opts, {
		logFileChanges: false
	}));

	gulp.watch('dist/css/main.min.css', ['reload-styles']);
	gulp.watch('dist/scripts/main.js', ['reload-scripts']);
	gulp.watch('**/*.php').on('change', browserSync.reload);
});

/* -------------------------
	Build
------------------------- */

gulp.task('build', function(cb) {
	sequence(
		'clean',
		['styles', 'scripts', 'images', 'fonts']
	)(cb);
});

/* -------------------------
	Deployment
------------------------- */

var deploy = {

	files: [
		'**/*',
		'!{__packaged,__packaged/**}',
		'!{vendor,vendor/**}',
		'!{src,src/**}',
		'!{templates,templates/**}',
		'!{node_modules,node_modules/**}',
		'!package.json',
		'!browserSync.json',
		'!gulpfile.js',
		'!composer.json',
		'!composer.lock',
		'!README.md'
	]

};

// Package task
// Package build files ready for uploading
gulp.task('package', ['build'], function() {
	gulp.src(deploy.files, {base: '.'})
		.pipe(gulp.dest('__packaged'));
});