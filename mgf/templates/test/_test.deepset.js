/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	mgf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset mgf', function tests() {

	var validationData = require( './fixtures/deepset.json' ),
		<%= parameters.map( function( p ) { return p.name + ' = validationData.' + p.name } ).join( ',\n\t\t' ) %>;

	it( 'should export a function', function test() {
		expect( mgf ).to.be.a( 'function' );
	});

	it( 'should compute the moment-generating function and deep set', function test() {
		var data, expected, i;

		data = validationData.data.map( function( e ) {
			return {'x': e};
		});

		data = mgf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' );

		expected = validationData.expected
			.map( function( d ) {
				return d === 'Inf' ? Infinity : d;
			})
			.map( function( d ) {
				return {'x': d};
			});

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x ) && isFiniteNumber( expected[ i ].x ) ) {
				assert.closeTo( data[ i ].x, expected[ i ].x, 1e-14 );
			}
		}

		// Custom separator...
		data = validationData.data.map( function( e ) {
			return {'x': [9, e]};
		});

		data = mgf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x/1', '/' );
		expected = validationData.expected
			.map( function( d ) {
				return d === 'Inf' ? Infinity : d;
			})
			.map( function( e ) {
				return {'x': [9, e]};
			});

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x[ 1 ] ) && isFiniteNumber( expected[ i ].x[ 1 ] ) ) {
				assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14, 'custom separator' );
			}
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mgf( [], <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' ), [] );
		assert.deepEqual( mgf( [], <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = mgf( data, <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
