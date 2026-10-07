// region Imports

// region Gulp

import { src, dest, series, watch, } from 'gulp';
import gulpif from 'gulp-if';

// endregion

// region Webpack

import webpack from 'webpack-stream';
import terser from 'terser-webpack-plugin';

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

// region Variables

// region Paths

const javascriptDirectory = `${source}/js`;
const javascriptScriptJsFile = `${javascriptDirectory}/script.js`;
const javascriptFiles = `${javascriptDirectory}/*.js`;
const watchFiles = `${javascriptDirectory}/**/*.js`;
const javascriptDestination = `${destination}/js`;

// endregion

// region Options

/**
 * @param {boolean} minimize
 *
 * @returns {import('webpack').Configuration}
 */
const webpackOptions = (minimize = false) => ({
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new terser({
        terserOptions: {
          mangle: minimize,
          compress: minimize,
          format: {
            comments: false,
            beautify: !minimize,
            indent_level: 2,
          },
        },
        extractComments: false,
      }),
    ],
  },
  entry: {
    script: javascriptScriptJsFile,
  },
  output: {
    filename: isProd && !minimize ? '[name].js' : '[name].min.js',
    // iife: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
});

// endregion

// endregion

// region Pipeline

const javascriptPipeline = () => src(javascriptFiles, gulpSrcOptions)
  .pipe(errorHandler())
  .pipe(webpack(webpackOptions()))
  .pipe(dest(javascriptDestination))
  .pipe(gulpif(isProd, webpack(webpackOptions(true))))
  .pipe(gulpif(isProd, dest(javascriptDestination)));

// endregion

// region Tasks

const javascriptTask = task(javascriptScriptJsFile, javascriptPipeline);
const javascriptWatchTask = () => watch(watchFiles, javascriptTask);
const deleteJavascriptFiles = () => deleteAsync(javascriptDestination);
const javascriptSingleTask = series(deleteJavascriptFiles, javascriptTask);

// endregion

// region Exports

export { javascriptTask, javascriptWatchTask, javascriptSingleTask, };

// endregion
