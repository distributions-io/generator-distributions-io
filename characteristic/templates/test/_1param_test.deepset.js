/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	<%= characteristic %> = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset <%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
	});

	it( 'should compute the distribution <%= characteristic %> and deep set', function test() {
		var data, expected;

		data = [
			{'x':<%= xArray[ 0 ] %>},
			{'x':<%= xArray[ 1 ] %>},
			{'x':<%= xArray[ 2 ] %>},
			{'x':<%= xArray[ 3 ] %>}
		];

		data = <%= characteristic %>( data, 'x' );
		expected = [
			{'x':<%= expectedArray[ 0 ] %>},
			{'x':<%= expectedArray[ 1 ] %>},
			{'x':<%= expectedArray[ 2 ] %>},
			{'x':<%= expectedArray[ 3 ] %>}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,<%= xArray[ 0 ] %>]},
			{'x':[9,<%= xArray[ 1 ] %>]},
			{'x':[9,<%= xArray[ 2 ] %>]},
			{'x':[9,<%= xArray[ 3 ] %>]}
		];

		data = <%= characteristic %>( data, 'x/1', '/' );
		expected = [
			{'x':[9,<%= expectedArray[ 0 ] %>]},
			{'x':[9,<%= expectedArray[ 1 ] %>]},
			{'x':[9,<%= expectedArray[ 2 ] %>]},
			{'x':[9,<%= expectedArray[ 3 ] %>]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= characteristic %>( [], 'x' ), [] );
		assert.deepEqual( <%= characteristic %>( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = <%= characteristic %>( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
