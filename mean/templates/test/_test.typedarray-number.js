/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/typedarray-number.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );



// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typedarray-number mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = new Int8Array( [ <%=xArray%> ] );
		<%=y%> = <%= yArray[ 0 ] %>;

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [
			MEAN( <%=x%>[ 0 ], <%=y%> ),
			MEAN( <%=x%>[ 1 ], <%=y%> ),
			MEAN( <%=x%>[ 2 ], <%=y%> ),
			MEAN( <%=x%>[ 3 ], <%=y%> )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], new Int8Array(), 1 ), [] );
	});

});
