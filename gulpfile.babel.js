/**
 * Load plugins
 *
 */
// Gulp
import { src, dest, watch, series, parallel } from 'gulp';
// Utility Plugins
import browserSync from "browser-sync";
import del from 'del';
import gulpif from 'gulp-if';
import named from 'vinyl-named';
import notify from 'gulp-notify';
import yargs from 'yargs';
import zip from 'gulp-zip';
// Style Plugins
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import cssmqpacker from 'css-mqpacker';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import sassglob from 'node-sass-glob-importer';
// Image Plugins
import imagemin from 'gulp-imagemin';
// Scripts
import babel from 'gulp-babel';
import include from 'gulp-include';
import uglify from 'gulp-uglify-es';

const bsOpts = require('./browserSync.json');
const PRODUCTION = yargs.argv.prod;
const path = __dirname;
const directory = path.substr(path.lastIndexOf('/') + 1);

/**
 * Set project asset paths
 * for use by all tasks
 */
const paths = {
	styles: {
		src: './src/styles/**/*.scss',
		dest: './dist/css/'
	},
	js: {
		src: './src/js/*.js',
		dest: './dist/js/'
	},
	img: {
		src: './src/img/**/*.{jpg,png,gif,svg}',
		dest: './dist/img/'
	}
}

/**
 * Build files
 *
 * Exclude build files from being included in the package task
 * @type {Object}
 */
const packaged = {
	name: directory,
	files: [
		'**/*',
		'!{__packaged,__packaged/**}',
		'!{node_modules,node_modules/**}',
		'!{src,src/**}',
		'!babelrc',
		'!browserSync.json',
		'!gulpfile.js',
		'!gulpfile.babel.js',
		'!package.json',
		'!package-lock.json',
		'!README.md'
	]
}

export const clean = () => del(['dist']);

export const styles = () => {
	return src(paths.styles.src)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass({
			importer: sassglob()
		}).on('error', sass.logError))
		.pipe(postcss([autoprefixer, cssmqpacker({sort: true})]))
	    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
		.pipe(dest(paths.styles.dest))
		.pipe(server.stream());
}

export const scripts = () => {
	return src(paths.js.src)
		.pipe(include()).on('error', console.log)
		.pipe(babel({ presets: [['@babel/preset-env']] }))
		.pipe(gulpif(PRODUCTION, uglify()))
		.pipe(dest(paths.js.dest));
}

export const images = () => {
	return src(paths.img.src)
		.pipe(gulpif(PRODUCTION, imagemin()))
		.pipe(dest(paths.img.dest));
}

export const copy = () => {
	return src(['src/**/*','!src/{img,js,styles}','!src/{img,js,styles}/**/*'])
		.pipe(dest('dist'));
}

export const watchFiles = () => {
	watch(paths.styles.src, styles);
	watch('src/js/**/*.js', series(scripts, reload));
	watch(['src/**/*','!src/{img,js,styles}','!src/{img,js,styles}/**/*'], series(copy, reload));
	watch("**/*.php", reload);
}

const server = browserSync.create();

export const serve = done => {
	server.init(bsOpts);
	done();
};

export const reload = done => {
	server.reload();
	done();
};

export const compress = () => {
	return src(packaged.files)
		.pipe(zip(`${packaged.name}.zip`))
		.pipe(dest('../'));
}

export const dev = series(clean, parallel(styles, images, copy, scripts), serve, watchFiles);
export const build = series(clean, parallel(styles, images, copy, scripts), compress);
export default dev;