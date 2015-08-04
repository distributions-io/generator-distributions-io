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

describe( 'typed-array <%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
	});

	it( 'should compute the distribution <%= characteristic %>', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = new Float64Array( [ <%= xArray.join( ', ' ) %>  ] );
		actual = new Float64Array( <%=x%>.length );

		actual = <%= characteristic %>( actual, <%=x%> );
		expected = new Float64Array( [ <%= expectedArray.join( ', ' ) %> ] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( <%= characteristic %>( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
