/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var <%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( ',\n\t\t' ) %>;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the <%= distribution %> pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( <%= parameters.map( function( p ) { return p.name} ).join( ', ' ) %>);
		expect( pdf ).to.be.a( 'function' );
	});

});
