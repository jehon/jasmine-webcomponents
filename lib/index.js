/* eslint-env node */

var path = require('path');

var createPattern = function (pattern) {
	return { pattern: pattern, included: true, served: true, watched: false };
};

var initJasmine = function (files) {
	files.unshift(createPattern(path.join(__dirname, '/../withHtml.js')));
	return files;
};

initJasmine.$inject = [ 'config.files' ];

module.exports = {
	'framework:jasmine-html': [ 'factory', initJasmine ]
};
