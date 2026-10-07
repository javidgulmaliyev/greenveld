// region Imports

// region Tasks

import { htmlWatchTask } from './html.js';
import { scssWatchTask } from './scss.js';
import { javascriptWatchTask } from './javascript.js';
import { imagesWatchTask } from './images.js';
import { svgWatchTask } from './svg.js';
import { videosWatchTask } from './videos.js';
import { pdfWatchTask } from './pdf.js';

// endregion

// region server

import { server } from './server.js';

// endregion

// endregion

// region Tasks array

const tasks = [
  htmlWatchTask,
  scssWatchTask,
  javascriptWatchTask,
  imagesWatchTask,
  svgWatchTask,
  videosWatchTask,
  pdfWatchTask,
];

// endregion

// region Task

const watchTask = () => {
  tasks.forEach(task => {
    task().on('all', server.reload);
  });
};

// endregion

// region Export

export { watchTask };

// endregion
