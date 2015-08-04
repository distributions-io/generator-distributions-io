/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided only one argument', function test() {

		expect( badValue ).to.throw( Error );

		function badValue() {
				mean( [1,2,3] );
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mean( [1,2,3], 2, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( [1,2,3], 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( new Int8Array([1,2,3]), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( matrix( [2,2] ), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( mean( values[ i ], 1 ) ) );
		}
	});

	it( 'should return NaN if the first argument is a number and the second argument is neither numberic, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( mean( <%= xArray[ 0 ] %>, values[ i ] ) ) );
		}
	});

	it( 'should throw an error for an invalid pairing of input arguments', function test() {
		var values = [
			new Int32Array( [<%= xArray.join( ', ' ) %>] ),
			[ <%= xArray.join( ', ' ) %> ]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( value, matrix( [ <%= yArray.join( ', ' ) %> ], [2,2] ) );
			};
		}
	});

	it( 'should return an array of `NaN`s for an input array and a non-valid input', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			var nans = mean( [ <%= xArray.join( ', ' ) %> ], values[ i ] );
			for ( var j = 0; j < nans.length; j++ ) {
				assert.isTrue( isnan( nans[ j ] ) );
			}
		}
	});

	it( 'should return a matrix of `NaN`s for an input matrix and a non-valid input', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			var nans = mean( matrix([ 10,20,30,40 ], [2,2] ), null );
			for ( var j = 0; j < nans.length; j++ ) {
				assert.isTrue( isnan( nans[ j ] ) );
			}
		}
	});

	it( 'should evaluate the  mean function for two numbers', function test() {
		assert.closeTo( mean(  <%= xArray[ 0 ] %>,  <%= yArray[ 0 ] %> ),  <%= expectedArray[ 0 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 1 ] %>,  <%= yArray[ 1 ] %> ),  <%= expectedArray[ 1 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 2 ] %>,  <%= yArray[ 2 ] %> ),  <%= expectedArray[ 2 ] %>, 1e-7 );
		assert.closeTo( mean(  <%= xArray[ 3 ] %>,  <%= yArray[ 3 ] %> ),  <%= expectedArray[ 3 ] %>, 1e-7 );
	});

	it( 'should evaluate the  mean function for a scalar and an array', function test() {
		var <%=x%>, <%=y%>, actual, expected;
		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = [ <%= yArray.join( ', ' ) %> ];
		actual = mean( <%=x%>, <%=y%>  );
		expected = [
			MEAN( <%=x%>, <%=y%>[ 0 ]),
			MEAN( <%=x%>, <%=y%>[ 1 ]),
			MEAN( <%=x%>, <%=y%>[ 2 ]),
			MEAN( <%=x%>, <%=y%>[ 3 ])
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the  mean function for a scalar and a matrix', function test() {
		var <%=x%>, <%=y%>, actual, expected, i;

		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = matrix( new Float64Array( [ <%= yArray.join( ', ' ) %> ] ), [2,2] );
		actual = mean( <%=x%>, <%=y%> );
		expected = matrix( new Float64Array([
			MEAN( <%=x%>, <%=y%>.data[ 0 ]),
			MEAN( <%=x%>, <%=y%>.data[ 1 ]),
			MEAN( <%=x%>, <%=y%>.data[ 2 ]),
			MEAN( <%=x%>, <%=y%>.data[ 3 ])
		]), [2,2] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual.data[ i ], expected.data[ i ], 1e-7 );
		}

	});

	it( 'should evaluate the mean function for a scalar and an array and cast result to a different dtype', function test() {
		var <%=x%>, <%=y%>, actual, expected;
		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = [ <%= yArray.join( ', ' ) %> ];
		actual = mean( <%=x%>, <%=y%>, {
			'dtype':'int32'
		});
		expected = new Int32Array( [
			MEAN( <%=x%>, <%=y%>[ 0 ]),
			MEAN( <%=x%>, <%=y%>[ 1 ]),
			MEAN( <%=x%>, <%=y%>[ 2 ]),
			MEAN( <%=x%>, <%=y%>[ 3 ])
		]);
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});


	it( 'should evaluate the mean function for a scalar and a matrix and cast to a different dtype', function test() {
		var <%=x%>, <%=y%>, actual, expected;
		<%=x%> = <%= xArray[ 0 ] %>;
		<%=y%> = matrix( new Float64Array( [ <%= yArray.join( ', ' ) %> ] ), [2,2] );
		actual = mean( <%=x%>, <%=y%>, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array([
			MEAN( <%=x%>, <%=y%>.data[ 0 ]),
			MEAN( <%=x%>, <%=y%>.data[ 1 ]),
			MEAN( <%=x%>, <%=y%>.data[ 2 ]),
			MEAN( <%=x%>, <%=y%>.data[ 3 ]) ]), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );

		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the mean function for two object arrays using an accessor', function test() {
		var actual, expected, <%=x%>, <%=y%>;

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

		actual = mean( <%=x%>, <%=y%>, {
			'accessor': getValue
		});

		expected = [
			<%= expectedArray.join( ', ' ) %>
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.<%=x%>;
			} else {
				return d.<%=y%>;
			}
		}

	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( mean( [], 1 ), [] );
		assert.deepEqual( mean( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( mean( new Int8Array(), 1 ), new Float64Array() );
	});


});
