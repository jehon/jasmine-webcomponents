/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
	var configuration = {
		plugins : [
			'karma-chrome-launcher',
			// 'karma-firefox-launcher',
			'karma-jasmine',
			'karma-coverage',
			'karma-html-reporter'
		],

		frameworks : [
			'jasmine',
		],

		reporters : [
			'progress',
			'coverage',
			'html'
		],

		files : [
			{ pattern: 'node_modules/**',                  included: false, served: true, watched: false },
			'withElement.js',
			'tests/*.js'
		],

		autoWatch : true,

		browsers: [
			// 'FirefoxHeadless',
			'ChromeHeadless'
		],

		// // https://github.com/karma-runner/karma-firefox-launcher/issues/76
		// customLaunchers: {
		// 	FirefoxHeadless: {
		// 		base: 'Firefox',
		// 		flags: [ '-headless' ],
		// 	},
		// },

		preprocessors: {
			'static/**/*.js': [ 'coverage' ],
		},

		coverageReporter: {
			type :  'lcov',
			dir :   __dirname + '/',
			subdir: 'target/'
		},

		htmlReporter: {
			outputDir: __dirname + '/target/html/',
		},
	};

	config.set(configuration);
};
