/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	getType = require( './../lib/getType.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'get type', function tests() {

	it( 'should export a function', function test() {
		expect( getType ).to.be.a( 'function' );
	});

	it( 'should return "number" if provided a number', function test() {
		var actual = getType( 5 );
		assert.strictEqual( actual, 'number' );
	});

	it( 'should return "matrix" if provided a matrix', function test() {
		var actual = getType( matrix( [2,2] ) );
		assert.strictEqual( actual, 'matrix' );
	});

	it( 'should return "typedarray" if provided a typed array', function test() {
		var actual = getType( new Int32Array(5) );
		assert.strictEqual( actual, 'typedarray' );
	});

	it( 'should return "array" if provided an array', function test() {
		var actual = getType( [1,2,3] );
		assert.strictEqual( actual, 'array' );
	});

	it( 'should return null if provided an unsupported value type', function test() {
		var values = [
			// 'beep', // supported as array-like
			true,
			false,
			null,
			undefined,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isNull( getType( values[i] ) );
		}
	});

});
