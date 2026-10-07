// region Imports

// region Gulp

import { series, parallel } from 'gulp';

// endregion

// region Tasks

import { clearTask } from './clear.js';
import { htmlTask } from './html.js';
import { scssTask } from './scss.js';
import { javascriptTask } from './javascript.js';
import { imagesTask } from './images.js';
import { svgTask } from './svg.js';
import { videosTask } from './videos.js';
import { pdfTask } from './pdf.js';
import { watchTask } from './watcher.js';
import { serverTask } from './server.js';
import { zipTask } from './zip.js';

// endregion

// endregion

// region Tasks

const defaultTasks = series(clearTask, parallel(htmlTask, scssTask, javascriptTask, imagesTask, svgTask, videosTask, pdfTask));

const devTask = series(defaultTasks, parallel(watchTask, serverTask));

const prodTask = series(defaultTasks, zipTask);

// endregion

// region Exports

export { devTask, prodTask };

// endregion
