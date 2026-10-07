// region Imports

// region Node

import fs from 'fs';

// endregion

// region Gulp

import { src, dest, series, } from 'gulp';

// endregion

// region Plugins

import { deleteAsync } from 'del';

// endregion

// region Local

import { errorHandler } from './functions.js';
import { source, destination } from './constants.js';
import { gulpSrcOptions } from './constants.js';

// endregion

// endregion

// region Variables

// region Paths

const fontsFolder = 'fonts';
const fontFiles = `${source}/${fontsFolder}/*.woff2`;
const fontsScssFile = `${source}/scss/${fontsFolder}/_fonts.scss`;
const fontsDestination = `${destination}/${fontsFolder}`;

// endregion

// region Font weights

const fontWeights = {
  thin: 100,
  hairline: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
}

// endregion

// endregion

// region Pipeline

const fontsPipeline = () => src(fontFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(dest(fontsDestination));

// endregion

// region Tasks

const deleteFonts = () => deleteAsync([fontsDestination, fontsScssFile]);

const createFontsScssFile = () => {
  fs.readdir(`${fontsDestination}/`, (error, fontFiles) => {
    if (fontFiles) {
      let isNewer;

      fs.writeFile(fontsScssFile, '', callback);

      [...fontFiles].forEach(fontFile => {
        const [fileName, extension] = fontFile.split('.');

        if (isNewer !== fileName) {
          const [fontName, weight, style] = fileName.split('-');

          fs.appendFile(fontsScssFile,
            `@font-face {\n\tfont-family: "${fontName.replaceAll(/\_/g, ' ').trim() || 'Font'}";\n\tsrc: url("../${fontsFolder}/${fontFile}") format("${extension}");\n\tfont-weight: ${fontWeights[`${weight}`.toLocaleLowerCase().trim()] || weight || 400};\n\tfont-style: ${style?.toLocaleLowerCase().trim() || 'normal'};\n\tfont-display: swap;\n}\r\n\n`,
            callback);

          isNewer = fileName;
        }
      });
    }
  });

  return src(fontFiles, gulpSrcOptions);

  function callback() { }
};

const fontsTask = series(deleteFonts, fontsPipeline, createFontsScssFile);

// endregion

// region Export

export { fontsTask };

// endregion
