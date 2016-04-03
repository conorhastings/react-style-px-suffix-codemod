'use strict';

jest.autoMockOff();

const fs = require('fs');
const p = require('path');

const read = fileName => fs.readFileSync(
  p.join(__dirname, global.baseDir, 'test', fileName),
  'utf8'
);

global.test = (testFileName, options) => {
  const jscodeshift = require('jscodeshift');
  const source = read(testFileName + '.js');
  const output = read(testFileName + '.output.js');
  const path = testFileName + '.js';
  const transform = require('../index.js');

  expect(
    (transform({path, source}, {jscodeshift}, options || {}) || '').trim()
  ).toEqual(
    output.trim()
  );
};