// region Imports

// region Node

import fs from 'fs';

// endregion

// region Gulp

import { src } from 'gulp';
import plumber from 'gulp-plumber';
import { onError } from 'gulp-notify';

// endregion

// region Local

import { source } from './constants.js';

// endregion

// endregion

// region Functions

/**
 * @param {string} directory
 * @param {NodeJS.ReadWriteStream} pipeline
 *
 * @returns {NodeJS.ReadWriteStream}
 */
const task = (directory, pipeline) => fs.existsSync(directory) ? pipeline : () => src(source);

const errorHandler = () => plumber({ errorHandler: onError(({ message }) => ({ message })) });

// endregion

// region Exports

export { task, errorHandler };

// endregion
