/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mean = require( './../lib/typedarray-typedarray.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typedarray-typedarray mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>,
			i;

		<%=x%> = new Float64Array( [ <%= xArray %> ] );
		<%=y%> = new Float64Array( [ <%= yArray.join( ', ' ) %> ] );
		actual = new Float64Array( <%=x%>.length );

		actual = mean( actual, <%=x%>, <%=y%> );

		expected = new Float64Array([
			<%= expectedArray.join( ', ' ) %>
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should throw an error if provided input arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( new Int8Array(), new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
