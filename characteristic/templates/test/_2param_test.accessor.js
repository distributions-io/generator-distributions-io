/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/accessor.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided arrays of equal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( [1,2], [1,2], [1,2,3] );
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value using an accessor when `<%=y%>` is a scalar', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':<%= xArray[ 1 ] %>},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];
		<%=y%> = <%= yArray[ 0 ] %>;
		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue );

		expected = <%=x%>.map( function(e){
			return MEAN( e.<%=x%>, <%=y%> );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 1 ) {
				return d;
			}
			return d.<%=x%>;
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value using an accessor when `<%=x%>` is a scalar', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = [
			{'<%=y%>':<%= yArray[ 0 ] %>},
			{'<%=y%>':<%= yArray[ 1 ] %>},
			{'<%=y%>':<%= yArray[ 2 ] %>},
			{'<%=y%>':<%= yArray[ 3 ] %>}
		];
		actual = new Array( <%=y%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue );

		expected = <%=y%>.map( function( e, i ) {
			return MEAN( <%=x%>, e.<%=y%> );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d;
			}
			return d.<%=y%>;
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value using an accessor for mixed arrays', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':<%= xArray[ 1 ] %>},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];

		<%=y%> = [ <%= yArray %> ];

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue );

		expected = <%=x%>.map( function( e, i ) {
			return MEAN( e.<%=x%>, <%=y%>[ i ] );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.<%=x%>;
			}
			return d;
		}
	});

	it( 'should compute the <%= distribution %> distribution expected value for two object arrays using an accessor', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':<%= xArray[ 1 ] %>},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];

		<%=y%> = [
			{'<%=y%>':<%= yArray[ 0 ] %>},
			{'<%=y%>':<%= yArray[ 1 ] %>},
			{'<%=y%>':<%= yArray[ 2 ] %>},
			{'<%=y%>':<%= yArray[ 3 ] %>}
		];

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue );

		expected = <%=x%>.map( function( e, i ) {
			return MEAN( e.<%=x%>, <%=y%>[ i ].<%=y%> );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.<%=x%>;
			} else {
				return d.<%=y%>;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.<%=x%>;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			<%=x%>, <%=y%>;

		// Array-scalar:
		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':null},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];
		<%=y%> = [ <%= yArray %> ];
		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue1 );

		expected = [
			<%= expectedArray[ 0 ] %>,
			NaN,
			<%= expectedArray[ 2 ] %>,
			<%= expectedArray[ 3 ] %>
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Array-array:
		<%=y%> = [ <%= yArray %> ];

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue1 );

		expected = [
			MEAN( <%=x%>[ 0 ].<%=x%>, <%=y%>[ 0 ] ),
			NaN,
			MEAN( <%=x%>[ 2 ].<%=x%>, <%=y%>[ 2 ] ),
			MEAN( <%=x%>[ 3 ].<%=x%>, <%=y%>[ 3 ] )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Array-typed array:
		<%=y%> = new Float64Array( [ <%= yArray %> ] );

		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue1 );

		expected = [
			<%= expectedArray[ 0 ] %>,
			NaN,
			<%= expectedArray[ 2 ] %>,
			<%= expectedArray[ 3 ] %>
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Object arrays:
		<%=y%> = [
			{'<%=y%>':<%= yArray[ 0 ] %>},
			{'<%=y%>':<%= yArray[ 1 ] %>},
			{'<%=y%>':<%= yArray[ 2 ] %>},
			{'<%=y%>':<%= yArray[ 3 ] %>}
		];
		actual = new Array( <%=x%>.length );
		actual = mean( actual, <%=x%>, <%=y%>, getValue2 );

		expected = [
			<%= expectedArray[ 0 ] %>,
			NaN,
			<%= expectedArray[ 2 ] %>,
			<%= expectedArray[ 3 ] %>
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue1( d, i, j ) {
			if ( j === 1 ) {
				return d;
			}
			return d.<%=x%>;
		}
		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.<%=x%>;
			} else {
				return d.<%=y%>;
			}
		}
	});

});
