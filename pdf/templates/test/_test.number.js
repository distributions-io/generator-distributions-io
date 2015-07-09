/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number <%= distribution %>-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the <%= distribution %> pdf for a single value', function test() {
		assert.closeTo( pdf( 2 ), , 1e-4 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = pdf( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( pdf( 1 ) );
	});

});
