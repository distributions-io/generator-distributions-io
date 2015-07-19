/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is infinite
	isinf = require( 'compute-isinf' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var	validationData = require( './fixtures/number.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( ',\n\t\t' ) %>;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the <%= distribution %> probability density function', function test() {
		var actual;
		for ( var i = 0; i < data.length; i++ ) {
			actual =  pdf( data[ i ], <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> );
			if ( !( isinf( actual ) === 1 && isinf( expected[ i ] ) === 1 ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}

	});

});
