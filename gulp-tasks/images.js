// region Imports

// region Gulp

import { src, dest, parallel, series, watch, } from 'gulp';
import newer from 'gulp-newer';
import gulpif from 'gulp-if';
import imagemin, { optipng, mozjpeg } from 'gulp-imagemin';
import webp from 'gulp-webp';

// endregion

// region Delete

import { deleteAsync } from 'del';

// endregion

// region Local

import { task, errorHandler } from './functions.js';
import { isProd, isNotWebp } from './constants.js';
import { source, destination } from './constants.js';
import { gulpSrcOptions } from './constants.js';

// endregion

// endregion

// region Variables

// region Paths

const imagesDirectory = `${source}/img`;
const imagesForConvertToWebp = `${imagesDirectory}/**/*.{png,jpg,jpeg}`;
const imagesForCopy = `${imagesDirectory}/**/*.{gif,webp}`;
const watchFiles = `${imagesDirectory}/**/*.{png,jpg,jpeg,gif,webp}`;
const imagesDestination = `${destination}/img`;

// endregion

// region Options

const imageminOptions = [optipng(), mozjpeg({ quality: 70 })];

// endregion

// endregion

// region Pipelines

const convertImagesToWebpPipeline = () => src(imagesForConvertToWebp, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(gulpif(!isProd, newer(imagesDestination)))
  .pipe(gulpif(isProd, imagemin(imageminOptions)))
  .pipe(dest(imagesDestination))
  .pipe(gulpif(isProd && !isNotWebp, webp()))
  .pipe(gulpif(isProd && !isNotWebp, dest(imagesDestination)));

const imagesCopyPipeline = () => src(imagesForCopy, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(gulpif(!isProd, newer(imagesDestination)))
  .pipe(dest(imagesDestination));

// endregion

// region Tasks

const convertImagesToWebpTask = task(imagesDirectory, convertImagesToWebpPipeline);
const imagesCopyTask = task(imagesDirectory, imagesCopyPipeline);
const imagesTask = parallel(convertImagesToWebpTask, imagesCopyTask);
const imagesWatchTask = () => watch(watchFiles, imagesTask);
const deleteImageFiles = () => deleteAsync(imagesDestination);
const imagesSingleTask = series(deleteImageFiles, imagesTask);

// endregion

// region Exports

export { imagesTask, imagesWatchTask, imagesSingleTask, };

// endregion
