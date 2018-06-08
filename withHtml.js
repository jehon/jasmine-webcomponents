/* eslint-env jasmine */
/* exported withHtml */

function withHtml(options, fn) {  // eslint-disable-line no-unused-vars
	if (typeof(options) != 'object') {
		options = {
			html: options
		};
		options = Object.assign({}, withHtml.defaultConfig, options);
	}
	let register = beforeAll;
	let unregister = afterAll;
	if (options.beforeEach) {
		register = beforeEach;
		unregister = afterEach;
	}

	return describe('', function() {
		let div;
		let element;

		register(function(done) {
			// Build up the element
			div = document.createElement('div');

			// - The real component
			let container = document.createElement('div');
			container.style='border: red solid 1px; min-height: 10px';
			container.innerHTML = options.html.trim();

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
			style.innerHTML = `
        		pre {
	          		background-color: yellow;
        		}
      		`;
			div.appendChild(style);
			element = container.childNodes;
			if (element.length == 1 && ! options.forceList) {
				element = element[0];
			}

			document.body.appendChild(div);
			setTimeout(done, options.setupTime);
		});

		// Register removing it afterwards
		unregister(function() {
			document.body.removeChild(div);
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
