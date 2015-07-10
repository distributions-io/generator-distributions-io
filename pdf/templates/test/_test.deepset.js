/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pdf', function tests() {

	var <%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( ',\t\t\n' ) %>;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> pdf and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = pdf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' );

		expected = [

		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-7 );
		}

		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = pdf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x/1', '/' );
		expected = [

		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' ), [] );
		assert.deepEqual( pdf( [], <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pdf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
