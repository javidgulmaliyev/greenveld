// region Imports

// region Gulp

import { src, dest, series, watch, } from 'gulp';
import gulpif from 'gulp-if';
import newer from 'gulp-newer';

// endregion

// region Delete

import { deleteAsync } from 'del';

// endregion

// region Local

import { task, errorHandler } from './functions.js';
import { isProd } from './constants.js';
import { source, destination } from './constants.js';
import { gulpSrcOptions } from './constants.js';

// endregion

// endregion

// region Paths

const pdfDirectory = `${source}/pdf`;
const pdfFiles = `${pdfDirectory}/**/*.pdf`;
const pdfDestination = `${destination}/pdf`;

// endregion

// region Pipeline

const pdfPipeline = () => src(pdfFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(gulpif(!isProd, newer(pdfDestination)))
  .pipe(dest(pdfDestination));

// endregion

// region Tasks

const pdfTask = task(pdfDirectory, pdfPipeline);
const pdfWatchTask = () => watch(pdfFiles, pdfTask);
const deletePdfFiles = () => deleteAsync(pdfDestination);
const pdfSingleTask = series(deletePdfFiles, pdfTask);

// endregion

// region Exports

export { pdfTask, pdfWatchTask, pdfSingleTask, };

// endregion
