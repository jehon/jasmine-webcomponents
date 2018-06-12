# Jasmine-Html

To test a web components, you need to insert it in the page. This is what jasmine-html does.

```lang=javascript
describe('in text mode', function() {
    withHtml('<div></div>', function(element) {
        it('should work', function() {
            expect(element().tagName).toBe('DIV');
        });
    });
});
```

The "withHtml" will insert the given text into a "div" on the body, and give it back to you as the first parameter of your callback (element in the example above);

If you html snippet give more than a element, a list is returned:

```lang=javascript
describe('with multiple elements', function() {
    withHtml('<div></div><span></span>', function(element) {
        it('should work', function() {
            expect(element().length).toBe(2);
            expect(element()[0].tagName).toBe('DIV');
            expect(element()[1].tagName).toBe('SPAN');
        });
    });
});
```

At the end of the test, the element will be removed.

To ease testing and debugging, the element will be displayed on page surrounded by some informations:

> TODO: show it here

## Installation

This library has no runtime depandancies. But if you need to test web components, you probably will need the polyfills.

Install it

```lang=bash
npm install -D karma-jasmine-html
```

## Usage in Karma

Add it as a "framework" in karma.conf.js:

```lang=javascript
module.exports = function(config) {
    config.set({
/* optional begin */
        plugins : [
            [...]
            'karma-jasmine',
            'karma-jasmine-html'
        ],
/* optional end */

        frameworks : [
            'jasmine',
            'jasmine-html'
        ],
    });
}
```

## Advanced options

You can provide some tweaking to the function:

```lang=javascript
describe('in option mode', function() {
    withHtml({
        title: 'test with title',
        html: '<test-element></test-element>',
        setupTime: 1,
        beforeEach: false
    }, function(element) {
        it('should work', function() {
            expect(element().tagName).toBe('TEST-ELEMENT');
            expect(element().incr).toEqual(jasmine.any(Function));
        });
    });
});
```

The options are:

|Name|Default value | Explanation |
|----|:------------:|-------------|
|title| -empty- | Title for display, and for the internal (hidden) describe (see below technical details) |
|setupTime| 1 (ms) | Time to wait for the object to being setup, if necessary|
|assertElementIsNotNull | false | Add some internal test to assert the elements are not null |
|beforeEach | true | Create and destroy the object before/after each test instead of keeping is through the test|

## Technically

withHtml() wrap around a 'describe' call. So you can rewrite this calls:

```lang=javascript
withHtml('test', function(elements) {
    it('does some test');
});
```

Is nearly equivalent to

```lang=javascript
describe(options.title, function() {
    beforeAll( <initialize the element>);
    afterAll( <remove the element>);

    it('does some test');
});
```

If you specify "beforeEach", you need to replace the above example with:

```lang=javascript
describe(options.title, function() {
    beforeEach( <initialize the element>);
    afterEach( <remove the element>);

    it('does some test');
});
```

## BeforeAll?

You can choose to have your component instantiated only once for you whole test suite. To make that, disable "options.beforeEach". But the order in which the "it()" commands are run are reported to be sometimes random. To disable randomness in your tests, add this in your karma.conf.js:

```lang=javascript
    config.set({
        client: {
            jasmine: {
                random: false
            }
        },
```

## To test

To test this framework:

```lang=javascript
npm run link
npm run test
```
