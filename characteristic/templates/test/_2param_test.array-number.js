/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/array-number.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array-number mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [ <%= xArray.join( ', ' ) %> ];
		<%=y%> = <%= yArray[ 0 ] %>;

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [
			<%= expectedArray[ 0 ] %>,
			MEAN( <%=x%>[ 1 ], <%=y%> ),
			MEAN( <%=x%>[ 2 ], <%=y%> ),
			MEAN( <%=x%>[ 3 ], <%=y%> )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], 1 ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [ true, null, [], {} ];
		<%=y%> = <%= yArray[ 0 ] %>;

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [ NaN, NaN, NaN, NaN ];
		assert.deepEqual( actual, expected );

		actual = new Int32Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		// Integer arrays cannot represent NaN:
		expected = new Int32Array( [ 0, 0, 0, 0 ] );
		assert.deepEqual( actual, expected );
	});

});
