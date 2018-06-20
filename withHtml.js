/* eslint-env jasmine */
/* exported withHtml */

const withHtml = (function() {
	const _buildContainer = (options) => {
		// - The real component
		let container = document.createElement('div');
		container.style='border: red solid 1px; min-height: 10px';
		container.innerHTML = options.html.trim();
		return container;
	};

	const _buildElement = (options, container) => {
		// Build up the element
		let div = document.createElement('div');


		div.appendChild(container);

		// - Add the title for completeness
		let h3 = document.createElement('h3');
		h3.innerHTML = 'Test: ' + options.title;
		div.appendChild(h3);

		// - Dump code for info
		let pre = document.createElement('pre');
		pre.innerHTML = options.html
			.split('&').join('&amp;')
			.split('<').join('&lt;')
			.split('>').join('&gt;');
		div.appendChild(pre);

		// Add some styling
		let style = document.createElement('style');
		style.innerHTML = 'pre { background-color: yellow; }';
		div.appendChild(style);
		return div;
	};

	const _extractElement = (options, container) => {
		let element = container.childNodes;
		if (element.length == 1 && ! options.forceList) {
			element = element[0];
		}

		return element;
	};

	function withHtml(options, fn) {
		if (typeof(options) != 'object') {
			options = {
				html: options
			};
		}
		options = Object.assign({}, withHtml.defaultConfig, options);
		let beforeEachOrAll = (options.beforeEach ? beforeEach : beforeAll);
		let afterEachOrAll = (options.beforeEach ? afterEach : afterAll);

		return describe('', function() {
			let div;
			let element;

			beforeEachOrAll((done) => {
				let container = _buildContainer(options);
				div = _buildElement(options, container);
				element = _extractElement(options, container);
				document.body.appendChild(div);
				setTimeout(done, options.setupTime);
			});

			if (options.assertElementIsNotNull) {
				// Make some tests just for completeness
				it('should initialize the object correctly', function() {
					expect(element).not.toBeUndefined();
					expect(element).not.toBeNull();
					if (element instanceof NodeList) {
						expect(element.length).toBeGreaterThan(0);
					}
				});
			}
	
			// Register removing it afterwards
			afterEachOrAll(() => document.body.removeChild(div));

			// We need to pass it as a function, because as we start this function
			// element is not already defined
			fn(() => element);
		});
	}

	withHtml.defaultConfig = {
		title: '',
		setupTime: 1,
		assertElementIsNotNull: false,
		beforeEach: true,
		forceList: false
	};

	return withHtml;
})();
