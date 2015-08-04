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
		assert.closeTo( mean(  <%= xArray[ 0 ] %>,  <%= yArray[ 0 ] %> ),  <%= expectedArray[ 0 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 1 ] %>,  <%= yArray[ 1 ] %> ),  <%= expectedArray[ 1 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 2 ] %>,  <%= yArray[ 2 ] %> ),  <%= expectedArray[ 2 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 3 ] %>,  <%= yArray[ 3 ] %> ),  <%= expectedArray[ 3 ] %>, 1e-7 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		assert.isTrue( isnan( mean( <%= xArray[ 0 ] %>, NaN ) ) );
		assert.isTrue( isnan( mean( NaN,  <%= yArray[ 0 ] %> ) ) );
		assert.isTrue( isnan( mean( NaN, NaN ) ) );
	});

});
