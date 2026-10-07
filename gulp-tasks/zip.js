// region Imports

// region Node

import path from 'path';

// endregion

// region Gulp

import { src, dest, parallel, series, } from 'gulp';
import zip from 'gulp-zip';

// endregion

// region Delete

import { deleteAsync } from 'del';

// endregion

// region Local

import { errorHandler } from './functions.js';
import { source, destination, archives, } from './constants.js';
import { gulpSrcOptions } from './constants.js';

// endregion

// endregion

// region Variables

const projectName = path.basename(process.cwd());
const allFiles = '/**/*.*';
const excludeDbFiles = '!./**/*.db';
const devFiles = [`{gulpfile.js,gulp-tasks${allFiles},${source.replace('./', '')}${allFiles},package.json}`, excludeDbFiles];
const prodFiles = [`${destination}${allFiles}`, excludeDbFiles];

// endregion

// region Pipelines

const devArchivePipeline = () => src(devFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(zip(`${projectName}-dev.zip`))
  .pipe(dest(archives));

const prodArchivePipeline = () => src(prodFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(zip(`${projectName}.zip`))
  .pipe(dest(archives));

// endregion

// region Task

const zipTask = parallel(devArchivePipeline, prodArchivePipeline);
const deleteArchiveFiles = () => deleteAsync(archives);
const zipSingleTask = series(deleteArchiveFiles, zipTask);

// endregion

// region Export

export { zipTask, zipSingleTask };

// endregion
