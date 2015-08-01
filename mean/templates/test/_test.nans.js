/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate that a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	nans = require( './../lib/nans.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;

// TESTS //

describe( 'nans', function tests() {
	it( 'should fill an array with `NaN`', function test() {
		var arr, out, i;
		arr = new Array( 4 );
		out = nans( arr );

		for ( i = 0; i < arr.length; i++ ) {
			assert.isTrue( isnan( out[ i ] ) );
		}
	});
});
