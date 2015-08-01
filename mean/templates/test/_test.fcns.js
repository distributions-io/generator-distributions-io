/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	hash = require( './../lib/fcns.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'mean functions', function tests() {

	it( 'should export an object', function test() {
		expect( hash ).to.be.an( 'object' );
	});

	it( 'should contain functions', function test() {
		var keys = Object.keys( hash ),
			len,
			i;

		len = keys.length;
		for ( i = 0; i < len; i++ ) {
			assert.isFunction( hash[ keys[i] ] );
		}
	});

});
