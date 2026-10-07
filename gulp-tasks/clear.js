// region Imports

// region Delete

import { deleteAsync } from 'del';

// endregion

// region Local

import { destination, archives } from './constants.js';

// endregion

// endregion

// region Task

const clearTask = () => deleteAsync([
  archives,
  `${destination}/{css,img,js,svg,videos,pdf}/**`,
  `${destination}/**/*.html`,
]);

// endregion

// region Export

export { clearTask };

// endregion
