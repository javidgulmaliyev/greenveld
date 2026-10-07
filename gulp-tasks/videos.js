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

const videosDirectory = `${source}/videos`;
const videoFiles = `${videosDirectory}/**/*.{mp4,webm,ogv}`;
const videosDestination = `${destination}/videos`;

// endregion

// region Pipeline

const videosPipeline = () => src(videoFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(gulpif(!isProd, newer(videosDestination)))
  .pipe(dest(videosDestination));

// endregion

// region Tasks

const videosTask = task(videosDirectory, videosPipeline);
const videosWatchTask = () => watch(videoFiles, videosTask);
const deleteVideoFiles = () => deleteAsync(videosDestination);
const videosSingleTask = series(deleteVideoFiles, videosTask);

// endregion

// region Exports

export { videosTask, videosWatchTask, videosSingleTask, };

// endregion
