/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
const gulp   = require( 'gulp' ), // Gulp of-course.

// CSS related plugins.
sass         = require( 'gulp-sass' ); // Gulp plugin for Sass compilation.
minifycss    = require( 'gulp-uglifycss' ), // Minifies CSS files.
autoprefixer = require( 'gulp-autoprefixer' ), // Autoprefixing magic.
mmq          = require( 'gulp-merge-media-queries' ), // Combine matching media queries into one.

// JS related plugins.
concat       = require( 'gulp-concat' ), // Concatenates JS files.
uglify       = require( 'gulp-uglify' ), // Minifies JS files.

// Image related plugins.
imagemin     = require( 'gulp-imagemin' ), // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
rename       = require( 'gulp-rename' ), // Renames files E.g. style.css -> style.min.css.
lineec       = require( 'gulp-line-ending-corrector' ), // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
filter       = require( 'gulp-filter' ), // Enables you to work on a subset of the original files by filtering them using a glob.
sourcemaps   = require( 'gulp-sourcemaps' ), // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
notify       = require( 'gulp-notify' ), // Sends message notification to you.
browserSync  = require( 'browser-sync' ).create(), // Reloads browser and injects CSS. Time-saving synchronized browser testing.
sort         = require( 'gulp-sort' ), // Recommended to prevent unnecessary changes in pot-file.
cache        = require( 'gulp-cache' ), // Cache files in stream for later use.
remember     = require( 'gulp-remember' ), //  Adds all the files it has ever seen back into the stream.
plumber      = require( 'gulp-plumber' ), // Prevent pipe breaking caused by errors from gulp plugins.
beep         = require( 'beepbeep' );

const PATHS = {
	styles: "src/styles/**/*.scss",
	jsVendor: "src/js/vendor/**/*.js",
	jsCustom: "src/js/lib/**/*.js",
	images: "src/img/**/*.{jpg,png,gif,svg}",
	fonts: "src/fonts/**/*.{eot,ttf,svg,woff,woff2}"
};

/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = r => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( r );
	beep();

	// this.emit('end');
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browsersync = done => {
	browserSync.init({
		proxy: 'http://wordpress.test',
		open: false,
		injectChanges: true,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	});
	done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
	browserSync.reload();
	done();
};

gulp.task( 'styles', () => {
	return gulp
		.src( PATHS.styles, { allowEmpty: true } )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe(
			sass({
				outputStyle: 'expanded',
				indentType : 'tab',
				indentWidth: 1,
				errLogToConsole: true
			})
		)
		.on( 'error', sass.logError )
		.pipe( sourcemaps.write({ includeContent: false }) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( autoprefixer() )
		.pipe( sourcemaps.write( './' ) )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/css' ) )
		.pipe( filter( '**/*.css' ) )
		.pipe( mmq({ log: false }) )
		.pipe( browserSync.stream() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss({ maxLineLen: 200 }) )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/css' ) )
		.pipe( browserSync.stream() )
		.pipe( notify({ message: 'Styles Task Completed', onLast: true }) );
});

gulp.task( 'vendorsJS', () => {
	return gulp
		.src( PATHS.jsVendor, { since: gulp.lastRun( 'vendorsJS' ) } )
		.pipe( plumber( errorHandler ) )
		.pipe( concat( 'vendor.js' ) )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/js' ) )
		.pipe( rename({ suffix: '.min' }))
		.pipe( uglify() )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/js' ) )
		.pipe( notify({ message: 'Vendor JS Task Completed', onLast: true }) );
});

gulp.task( 'customJS', () => {
	return gulp
		.src( PATHS.jsCustom, { since: gulp.lastRun( 'customJS' ) } )
		.pipe( plumber( errorHandler ) )
		.pipe( concat( 'functions.js' ) )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/js' ) )
		.pipe( rename({ suffix: '.min' }))
		.pipe( uglify() )
		.pipe( lineec() )
		.pipe( gulp.dest( 'dist/js' ) )
		.pipe( notify({ message: 'Custom JS Task Completed', onLast: true }) );
});

gulp.task( 'images', () => {
	return gulp
		.src( PATHS.images )
		.pipe(
			cache(
				imagemin([
					imagemin.gifsicle({ interlaced: true }),
					imagemin.jpegtran({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 3 }),
					imagemin.svgo({
						plugins: [ { removeViewBox: true } , { cleanupIDs: false } ]
					})
				])
			)
		)
		.pipe( gulp.dest( 'dist/img' ) )
		.pipe( notify({ message: 'Image Task Completed', onLast: true }) );
});

gulp.task( 'clear', function( done ) {
	return cache.clearAll( done );;
});

gulp.task( 'fonts', () => {
	return gulp
		.src( PATHS.fonts, { since: gulp.lastRun( 'fonts' ) } )
		.pipe( plumber( errorHandler ) )
		.pipe( gulp.dest( 'dist/fonts' ) )
		.pipe( notify({ message: 'Fonts Task Completed', onLast: true }) );

});

gulp.task(
	'default',
	gulp.parallel( 'styles', 'vendorsJS', 'customJS', 'images', browsersync, () => {
		gulp.watch( './**/*.php', reload );
		gulp.watch( './src/styles/**/*.scss', gulp.parallel( 'styles' ) );
		gulp.watch( './src/js/vendor/**/*.js', gulp.series( 'vendorsJS', reload ) );
		gulp.watch( './src/js/*.js', gulp.series( 'customJS', reload ) );
		gulp.watch( './src/img/*', gulp.series( 'images', reload ) );
	})
);