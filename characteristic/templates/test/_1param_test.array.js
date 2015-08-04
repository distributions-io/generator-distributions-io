/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	<%= characteristic %> = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array <%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
	});

	it( 'should compute the distribution <%= characteristic %>', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [ <%= xArray.join( ', ' ) %> ];
		actual = new Array( <%=x%>.length );

		actual = <%= characteristic %>( actual, <%=x%> );
		expected = [ <%= expectedArray.join( ', ' ) %> ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= characteristic %>( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = <%= characteristic %>( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
