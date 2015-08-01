/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/array-array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array-array mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( [1,2], [1,2], [1,2,3] );
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [ <%= xArray %> ];
		<%=y%> = [ <%= yArray %> ];

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [ <%= expectedArray %> ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [ true, null, [], {} ];
		<%=y%> = [ <%= yArray %> ];
		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [ NaN, NaN, NaN, NaN ];
		assert.deepEqual( actual, expected );

		<%=x%> = [ <%= xArray %> ];
		<%=y%> = [ <%= yArray[ 0 ] %>, NaN, <%= yArray[ 2 ] %>, null ];
		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%> );

		expected = [ <%= expectedArray[ 0 ] %>, NaN,<%= expectedArray[ 2 ] %>, NaN ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

});
