// region Variables

// region Flags

const isProd = process.argv.includes('--prod');
const isPreview = process.argv.includes('--preview');
const isNotWebp = process.argv.includes('--not-webp');

// endregion

// region Paths

const source = './src';
const destination = './public';
const archives = './archives';

// endregion

// region Options

/** @type {import('vinyl-fs').SrcOptions} */
const gulpSrcOptions = { encoding: false, allowEmpty: true };

// endregion

// endregion

// region Exports

export {
  isProd,
  isPreview,
  isNotWebp,
  source,
  destination,
  archives,
  gulpSrcOptions,
};

// endregion
