/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
	config.set({
		client: {
			jasmine: {
				random: false
			}
		},

		frameworks : [
			'jasmine',
			'jasmine-html'
		],

		reporters : [
			'progress',
			'coverage',
		],

		files : [
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
			'*.js': [ 'coverage' ],
		},

		coverageReporter: {
			type :  'lcov',
			dir :   __dirname + '/',
			subdir: 'target/'
		},
	});
};
