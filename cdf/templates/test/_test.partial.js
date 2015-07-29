/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Check whether an element is `NaN`
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial cdf', function tests() {

	var	validationData = require( './fixtures/partial.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		<%= parameters.map( function( p ) { return p.name + ' = validationData.' + p.name } ).join( ',\n\t\t' ) %>;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the <%= distribution %> cdf for given parameter values', function test() {
		var cdf;
		cdf = partial( <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %> );
		expect( cdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the cumulative distribution function', function test() {
		var cdf, actual;
		cdf = partial(  <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> );
		for ( var i = 0; i < data.length; i++ ) {
			actual = cdf( data[ i ] );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}
	});

	it( 'should return `NaN` if provided `NaN` as input', function test() {
		var cdf = partial(  <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> );
		assert.isTrue( isnan( cdf( NaN ) ) );
	});

});
