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

const svgDirectory = `${source}/svg`;
const svgFiles = `${svgDirectory}/**/*.svg`;
const svgDestination = `${destination}/svg`;

// endregion

// region Pipeline

const svgPipeline = () => src(svgFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(gulpif(!isProd, newer(svgDestination)))
  .pipe(dest(svgDestination));

// endregion

// region Tasks

const svgTask = task(svgDirectory, svgPipeline);
const svgWatchTask = () => watch(svgFiles, svgTask);
const deleteSvgFiles = () => deleteAsync(svgDestination);
const svgSingleTask = series(deleteSvgFiles, svgTask);

// endregion

// region Exports

export { svgTask, svgWatchTask, svgSingleTask, };

// endregion
