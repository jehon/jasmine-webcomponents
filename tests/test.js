/* eslint-env jasmine */

class TestElement extends HTMLElement {
	constructor() {
		super();
		this.test = 0;
	}

	incr() {
		this.test++;
	}
}
window.customElements.define('test-element', TestElement);

describe('root test', function() {
	it('works', function() {
		expect(true).toBeTruthy();
	});
});

withElement('webDescribe.js', '<div></div>', function(element) {
	it('should work', function() {
		expect(element()).not.toBe(null);
		expect(element().tagName).toBe('DIV');
	});
});
