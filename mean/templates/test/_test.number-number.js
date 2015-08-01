/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate that a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	mean = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-number mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		assert.closeTo( mean( 1e-7, 1e-7 ), 19999999.99999968, 1e-7 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		assert.isTrue( isnan( mean( 2, NaN ) ) );
		assert.isTrue( isnan( mean( NaN, 1 ) ) );
		assert.isTrue( isnan( mean( NaN, NaN ) ) );
	});

});
