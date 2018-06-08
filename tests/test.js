/* eslint-env jasmine */
/* global withHtml */

class TestElement extends HTMLElement {
	constructor() {
		super();
		this.test = 0;
		this.intervalCount = 0;
		this.interval = setInterval(() => {
			this.intervalCount++;
			if (this.intervalCount > 10) {
				this.clear();
			}
		}, 10);
	}

	incr() {
		this.test++;
	}

	clear() {
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = false;
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
describe('in text mode', function() {
	withHtml('<div></div>', function(element) {
		it('should work', function() {
			expect(element().tagName).toBe('DIV');
		});
	});
});

describe('with multiple elements', function() {
	withHtml({
		html: '<div></div><span></span>',
		assertElementIsNotNull: true
	}, function(element) {
		it('should work', function() {
			expect(element().length).toBe(2);
			expect(element()[0].tagName).toBe('DIV');
			expect(element()[1].tagName).toBe('SPAN');
		});
	});
});

describe('in option mode', function() {
	withHtml({
		title: 'test with title',
		html: '<test-element></test-element>'
	}, function(element) {
		it('should work', function() {
			expect(element().tagName).toBe('TEST-ELEMENT');
			expect(element().incr).toEqual(jasmine.any(Function));
		});
	});

	withHtml({
		title: 'test with forceList',
		html: '<test-element></test-element>',
		forceList: true
	}, function(element) {
		it('should work', function() {
			expect(element()).toEqual(jasmine.any(NodeList));
			expect(element().length).toBe(1);
			expect(element()[0].tagName).toBe('TEST-ELEMENT');
		});
	});

	withHtml({
		title: 'test with title',
		html: '<test-element></test-element>',
		assertElementIsNotNull: true
	}, function(element) {
		it('should work', function() {
			expect(element().tagName).toBe('TEST-ELEMENT');
		});
	});

	withHtml({
		title: 'test with setupTime',
		html: '<test-element></test-element>',
		setupTime: 100
	}, function(element) {
		it('should work', function() {
			expect(element().tagName).toBe('TEST-ELEMENT');
			expect(element().intervalCount).toBeGreaterThan(9);
		});
	});

	describe('test beforeAll', function() {
		withHtml({
			title: 'test with setupTime',
			html: '<test-element></test-element>',
			beforeEach: false
		}, function(element) {
			it('should work', function() {
				expect(element().tagName).toBe('TEST-ELEMENT');
				element().incr();
				expect(element().test).toBe(1);
			});

			it('should continue with the same object', function() {
				expect(element().tagName).toBe('TEST-ELEMENT');
				expect(element().test).toBe(1);
			});
		});
	});

	describe('test beforeEach', function() {
		withHtml({
			title: 'test with setupTime',
			html: '<test-element></test-element>',
			beforeEach: true
		}, function(element) {
			it('should work', function() {
				expect(element().tagName).toBe('TEST-ELEMENT');
				element().incr();
				expect(element().test).toBe(1);
			});

			it('should continue with the same object', function() {
				expect(element().tagName).toBe('TEST-ELEMENT');
				expect(element().test).toBe(0);
			});
		});
	});
});
