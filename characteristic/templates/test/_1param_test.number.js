/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	<%= characteristic %> = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number <%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
	});

	it( 'should compute the distribution <%= characteristic %>', function test() {
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 0 ] %> ), <%= expectedArray[ 0 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 1 ] %>  ), <%= expectedArray[ 1 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 2 ] %>  ), <%= expectedArray[ 2 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 3 ] %>  ), <%= expectedArray[ 3 ] %> );
	});

});
