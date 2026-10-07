// region Imports

// region Node

import fs from 'fs';

// endregion

// region BrowserSync

import browsersync from 'browser-sync';

// endregion

// region Local

import { isPreview } from './constants.js';
import { destination } from './constants.js';

// endregion

// endregion

// region Variables

// region Path

const htmlPagesFile = `${destination}/pages.html`;

// endregion

// region server

const server = browsersync.create();

// endregion

// endregion

// region Task

const serverTask = () => server.init({
  server: {
    baseDir: destination,
  },
  notify: false,
  port: isPreview ? 3500 : 3000,
  startPath: fs.existsSync(htmlPagesFile) ? 'pages.html' : undefined,
});

// endregion

// region Exports

export { server, serverTask };

// endregion
