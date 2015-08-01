/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/number-typedarray.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-typedarray mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = new Int8Array( [ <%= yArray %> ] );

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [
			MEAN( <%=x%>, <%=y%>[ 0 ] ),
			MEAN( <%=x%>, <%=y%>[ 1 ] ),
			MEAN( <%=x%>, <%=y%>[ 2 ] ),
			MEAN( <%=x%>, <%=y%>[ 3 ] )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], 1, new Int8Array() ), [] );
	});

});
