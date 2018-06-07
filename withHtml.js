/* eslint-env jasmine */
/* exported withElement */

function withElement(options, fn) {  // eslint-disable-line no-unused-vars
	if (typeof(options) != 'object') {
		options = {
			html: options
		};
		options = Object.assign({
			title: '',
			setupTime: 1,
			assertElementIsNotNull: false
		}, options);
	}
	return describe('', function() {
		let div;
		let element;

		beforeEach(function(done) {
			// Build up the element

			// - The real component
			div = document.createElement('div');
			div.style='border: red solid 1px; min-height: 10px';
			div.innerHTML = options.html.trim();

			// - Add the title for completeness
			let h3 = document.createElement('h3');
			h3.innerHTML = 'Test: ' + options.title;
			div.appendChild(h3);

			// - Dump code for info
			let pre = document.createElement('pre');
			pre.innerHTML = options.html.split('<').join('&lt;').split('>').join('&gt');
			div.appendChild(pre);

			// Add some styling
			let style = document.createElement('style');
			style.innerHTML = `
        		pre {
	          		background-color: yellow;
        		}
      		`;
			div.appendChild(style);
			element = div.firstChild;

			document.body.appendChild(div);
			setTimeout(done, options.setupTime);
		});

		// Register removing it afterwards
		afterEach(function() {
			document.body.removeChild(div);
		});

		if (options.assertElementIsNotNull) {
			// Make some tests just for completeness
			it('should initialize the object correctly', function() {
				expect(element).not.toBeUndefined();
				expect(element).not.toBeNull();
			});
		}

		// We need to pass it as a function, because as we start this function
		// element is not already defined
		fn(() => element);
	});
}
