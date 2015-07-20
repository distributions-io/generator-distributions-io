/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial quantile', function tests() {

	var	validationData = require( './fixtures/partial.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			if (d === 'Inf' ) {
				return Number.POSITIVE_INFINITY;
			}
			if ( d === '-Inf' ) {
				return Number.NEGATIVE_INFINITY;
			}
			return d;
		}),
		<%= parameters.map( function( p ) { return p.name + ' = validationData.' + p.name } ).join( ',\n\t\t' ) %>;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the quantile function of the <%= distribution %> distribution for given parameter values', function test() {
		var quantile;
		quantile = partial( <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %> );
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the quantile function', function test() {
		var quantile, actual;
		quantile = partial(  <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> );
		for ( var i = 0; i < data.length; i++ ) {
			actual = quantile( data[ i ] );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-12 );
			}
		}


	});

});
