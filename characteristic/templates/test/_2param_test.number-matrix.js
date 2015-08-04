/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/number-matrix.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-matrix mean', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = MEAN( 2, i );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an incompatible output matrix', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			mean( matrix( [10,10] ), 2, mat );
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = mean( actual, 2, mat );

		assert.isTrue( deepCloseTo( actual.data, out.data, 1e-7 ) );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( mean( out, 2, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( mean( out, 2, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( mean( out, 2, mat ).data, expected );
	});

});
