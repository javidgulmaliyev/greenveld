import { isProd, isPreview } from './gulp-tasks/constants.js';

import { devTask as dev, prodTask as prod } from './gulp-tasks/build.js';
import { serverTask as preview } from './gulp-tasks/server.js';
import { fontsTask as fonts } from './gulp-tasks/fonts.js';
import { zipSingleTask as zip } from './gulp-tasks/zip.js';
import { htmlSingleTask as html } from "./gulp-tasks/html.js";
import { scssSingleTask as scss } from "./gulp-tasks/scss.js";
import { javascriptSingleTask as javascript } from "./gulp-tasks/javascript.js";
import { imagesSingleTask as images } from './gulp-tasks/images.js';
import { svgSingleTask as svg } from './gulp-tasks/svg.js';
import { videosSingleTask as videos } from './gulp-tasks/videos.js';
import { pdfSingleTask as pdf } from './gulp-tasks/pdf.js';

const defaultTask = isProd ? prod : isPreview ? preview : dev;

export { defaultTask as default };
export { fonts };
export { zip };
export { html };
export { scss };
export { javascript };
export { images };
export { svg };
export { videos };
export { pdf };
