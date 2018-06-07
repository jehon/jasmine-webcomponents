/* eslint-env node */
// https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/ensureSymlink-sync.md

const fs = require('fs-extra')

const srcpath = '../';
const dstpath = 'node_modules/jasmine-html';
fs.ensureSymlinkSync(srcpath, dstpath);
