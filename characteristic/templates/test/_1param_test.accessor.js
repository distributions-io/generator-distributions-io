/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	<%= characteristic %> = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor <%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
	});

	it( 'should compute the distribution <%= characteristic %> using an accessor', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':<%= xArray[ 1 ] %>},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];
		actual = new Array( <%=x%>.length );

		actual = <%= characteristic %>( actual, <%=x%>, getValue );
		expected = [ <%= expectedArray.join( ', ' ) %> ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.<%=x%>;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= characteristic %>( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( <%=x%>.length );
		actual = <%= characteristic %>( actual, <%=x%>, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
