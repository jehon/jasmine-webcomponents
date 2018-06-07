/* eslint-env jasmine */
/* global withHtml */

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

/* Check that karma is still ok */
describe('root test', function() {
	it('works', function() {
		expect(true).toBeTruthy();
	});
});

/* The real test for div component */
withElement('<div></div>', function(element) {
	it('should work', function() {
		expect(element()).not.toBe(null);
		expect(element().tagName).toBe('DIV');
	});
});
