// region Imports

// region Gulp

import { src, dest, series, watch, } from 'gulp';
import gulpif from 'gulp-if';
import gulpsass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';

// endregion

// region Plugins

import sass from 'sass';
import sortMediaQueries from 'postcss-sort-media-queries';
import through2 from 'through2';
import { transform, browserslistToTargets, Features, } from 'lightningcss';
import browserslist from 'browserslist';
import { deleteAsync } from 'del';

// endregion

// region Local

import { task, errorHandler } from './functions.js';
import { isProd } from './constants.js';
import { source, destination } from './constants.js';
import { gulpSrcOptions } from './constants.js';

// endregion

// endregion

// region Plugins

const scss = gulpsass(sass);

/**
 * @param {boolean} minimize
 * @param {boolean} vendorPrefixes
 */
const lightningcss = (minimize, vendorPrefixes) => {
  return through2.obj((file, encode, callback) => {
    if (file.isBuffer()) {
      const result = transform({
        filename: file.path,
        code: file.contents,
        minify: minimize,
        sourceMap: false,
        exclude: Features.LogicalProperties | Features.DirSelector,
        targets: vendorPrefixes ? browserslistToTargets(browserslist('defaults')) : undefined,
      });

      file.contents = result.code;
    }

    callback(null, file);
  });
};

// endregion

// region Variables

// region Paths

const scssDirectory = `${source}/scss`;
const scssFiles = `${scssDirectory}/*.scss`;
const watchFiles = `${scssDirectory}/**/*.scss`;
const scssDestination = `${destination}/css`;

// endregion

// region Options

/** @type {import('sass').Options} */
const scssOptions = {
  // silenceDeprecations: ['import', 'legacy-js-api',],
};

const postcssOptions = [sortMediaQueries()];

/** @type {import('gulp-rename').Options} */
const renameOptions = { suffix: '.min' };

// endregion

// endregion

// region Pipeline

const scssPipeline = () => src(scssFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(scss(scssOptions))
  .pipe(gulpif(isProd, postcss(postcssOptions)))
  .pipe(gulpif(isProd, lightningcss(false, true)))
  .pipe(gulpif(isProd, dest(scssDestination)))
  .pipe(rename(renameOptions))
  .pipe(gulpif(isProd, lightningcss(true, false)))
  .pipe(dest(scssDestination));

// endregion

// region Tasks

const scssTask = task(scssDirectory, scssPipeline);
const scssWatchTask = () => watch(watchFiles, scssTask);
const deleteCssFiles = () => deleteAsync(scssDestination);
const scssSingleTask = series(deleteCssFiles, scssTask);

// endregion

// region Exports

export { scssTask, scssWatchTask, scssSingleTask, };

// endregion
