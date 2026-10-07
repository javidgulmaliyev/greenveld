// region Imports

// region Gulp

import { src, dest, watch, series, } from 'gulp';
import fileinclude from 'gulp-file-include';
import gulpif from 'gulp-if';
import webphtmlnosvg from 'gulp-webp-html-nosvg';
import htmlmin from 'gulp-htmlmin';
import versionnumber from 'gulp-version-number';

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

// region Flag

const isNotHtmlMinimize = process.argv.includes('--not-html-minimize');

// endregion

// region Paths

const htmlDirectory = `${source}/html`;
const htmlFiles = `${htmlDirectory}/*.html`;
const watchFiles = `${htmlDirectory}/**/*.{html,svg,json}`;

// endregion

// region Options

/** @type {import('html-minifier').Options} */
const htmlminOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const versionnumberOptions = { append: { to: ["css", "js"] } };

// endregion

// endregion

// region Pipeline

const htmlPipeline = () => src(htmlFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(fileinclude())
  .pipe(gulpif(isProd && !isNotWebp, webphtmlnosvg()))
  .pipe(gulpif(isProd && !isNotHtmlMinimize, htmlmin(htmlminOptions)))
  .pipe(gulpif(isProd, versionnumber(versionnumberOptions)))
  .pipe(dest(destination));

// endregion

// region Tasks

const htmlTask = task(htmlDirectory, htmlPipeline);
const htmlWatchTask = () => watch(watchFiles, htmlTask);
const deleteHtmlFiles = () => deleteAsync(`${destination}/**/*.html`);
const htmlSingleTask = series(deleteHtmlFiles, htmlTask);

// endregion

// region Exports

export { htmlTask, htmlWatchTask, htmlSingleTask, };

// endregion
