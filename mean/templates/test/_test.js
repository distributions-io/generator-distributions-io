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



	it( 'should throw an error if provided a number as the first argument and an not applicable option', function test() {
		var values = [
			{'accessor': function getValue( d ) { return d; } },
			{'copy': false},
			{'path': '<%=x%>'},
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( 1, [1,2,3], value );
			};
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
			assert.isTrue( isnan( mean( 1, values[ i ] ) ) );
		}
	});

	it( 'should evaluate the  mean function for two numbers', function test() {
		assert.closeTo( mean( 2, 4 ), 0.05, 1e-7 );
		assert.closeTo( mean( 1, 1 ), 1, 1e-7 );
	});

	it( 'should evaluate the  mean function for a scalar and an array', function test() {
		var data, actual, expected;
		data = [ 1, 5 ];
		actual = mean( 3, data );
		expected = [
			0.333333333333333315,
			0.009523809523809525
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the  mean function for a scalar and a matrix', function test() {
		var data, actual, expected, i;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = mean( 2, data );
		expected = matrix( new Float64Array([
			0.5,
			0.16666666666666666,
			0.08333333333333333,
			0.05000000000000000
		]), [2,2] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual.data[ i ], expected.data[ i ], 1e-7 );
		}

	});


	it( 'should evaluate the mean function for a scalar and an array and cast result to a different dtype', function test() {
		var data, actual, expected;
		data = [ 1, 10 ];
		actual = mean( 0.1, data, {
			'dtype':'int32'
		});
		expected = new Int32Array( [9,7] );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});


	it( 'should evaluate the mean function for a scalar and a matrix and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = mean( 0.4, data, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [2,1,1,1] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );

		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the mean function for a matrix and a scalar and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [1,2,3,4] ), [2,2] );
		actual = mean( data, 0.4, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [2,1,1,1] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );

		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the mean function for a plain array and a scalar', function test() {
		var data, actual, expected;

		data = [
			0.1,
			0.2,
			0.5,
			0.8,
			1,
			2,
			3,
			4,
			5,
			10,
			20,
			100
		];
		expected = [
			11.32308697521575,
			6.268653124086035,
			3.141592653589794,
			2.299287818447969,
			2,
			1.333333333333333,
			1.066666666666667,
			0.9142857142857143,
			0.8126984126984126,
			0.567546385503043,
			0.3988173068948813,
			0.1774670794283158
		];

		actual = mean( data, 0.5 );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = mean( data, 0.5, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should evaluate the mean function for a plain array and another array', function test() {
		var data, actual, expected;

		data = [
			1,
			2,
			3,
			4
		];
		expected = [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		];

		actual = mean( data, data );
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = mean( data, data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should evaluate the mean function for a typed array and a scalar', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ 3, 6, 9, 12 ] );

		expected = new Float64Array( [
			0.03333333333333333,
			0.005952380952380952,
			0.00202020202020202,
			0.0009157509157509158
		]);

		actual = mean( data, 3 );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = mean( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		expected = new Int8Array( [ 0, 0, 0, 0 ] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

	});

	it( 'should evaluate the mean function for a typed array and another typed array', function test() {
		var data, actual, expected, i;

		data = new Float32Array( [ 1, 2, 3, 4 ] );

		expected = new Float64Array( [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		]);

		actual = mean( data, data );
		assert.notEqual( actual, data );
		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		// Mutate:

		actual = mean( data, data, {
			'copy': false
		});
		expected = new Float32Array([
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		]);
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should evaluate the mean function for a typed array and a scalar and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 1, 2, 3, 4 ];
		expected = new Int8Array( [ 4, 4, 3, 3 ] );

		actual = mean( data, 0.2, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the mean function for an object array and a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,10],
			[4,20],
			[5,30],
			[6,40]
		];

		expected = [
			0.009090909090909092,
			0.002380952380952381,
			0.001075268817204301,
			0.0006097560975609757
		];

		actual = mean( data, 2, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = mean( data, 2, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the mean function for two object arrays using an accessor', function test() {
		var data, actual, expected, <%=y%>;

		data = [
			{'<%=x%>':10},
			{'<%=x%>':20},
			{'<%=x%>':30},
			{'<%=x%>':40}
		];

		<%=y%> = [
			{'<%=y%>':10},
			{'<%=y%>':20},
			{'<%=y%>':30},
			{'<%=y%>':40}
		];

		actual = mean( data, <%=y%>, {
			'accessor': getValue
		});

		expected = [
			1.082508822446903e-06,
			7.254444551924845e-13,
			5.637077964048311e-19,
			4.650850914009383e-25
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

	it( 'should evaluate the mean function for an array and a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'<%=x%>':[9,1]},
			{'<%=x%>':[9,2]},
			{'<%=x%>':[9,3]},
			{'<%=x%>':[9,4]}
		];
		expected = [
			{'<%=x%>':[9,2]},
			{'<%=x%>':[9,1.333333333333333]},
			{'<%=x%>':[9,1.066666666666667]},
			{'<%=x%>':[9,0.9142857142857143]}
		];

		actual = mean( data, 0.5, {
			'path': '<%=x%>.1'
		});

		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Specify a path with a custom separator...
		data = [
			{'<%=x%>':[9,1]},
			{'<%=x%>':[9,2]},
			{'<%=x%>':[9,3]},
			{'<%=x%>':[9,4]}
		];
		actual = mean( data, 0.5, {
			'path': '<%=x%>/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the mean function for an array with another array and deep set', function test() {
		var data, actual, expected, <%=y%>;

		data = [
			{'<%=x%>':1},
			{'<%=x%>':2},
			{'<%=x%>':3},
			{'<%=x%>':4}
		];

		<%=y%> = [ 1, 2, 3, 4 ];

		actual = mean( data, <%=y%>, {
			path: '<%=x%>'
		});

		expected = [
			{'<%=x%>':1},
			{'<%=x%>':0.1666666666666667},
			{'<%=x%>':0.03333333333333333},
			{'<%=x%>':0.007142857142857144}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'<%=x%>':[9,1]},
			{'<%=x%>':[9,2]},
			{'<%=x%>':[9,3]},
			{'<%=x%>':[9,4]}
		];

		data = mean( data, <%=y%>, {
			'path': '<%=x%>/1',
			'sep': '/'
		});
		expected = [
			{'<%=x%>':[9,1]},
			{'<%=x%>':[9,0.1666666666666667]},
			{'<%=x%>':[9,0.03333333333333333]},
			{'<%=x%>':[9,0.007142857142857144]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ), 'custom separator' );
	});

	it( 'should evaluate the mean function for a matrix and a scalar', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Int32Array( 100 );
		d3 = new Int32Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = MEAN( i, i );
			d3[ i ] = MEAN( i, 2 );
		}

		mat = matrix( d1, [10,10], 'int32' );
		out = mean( mat, 2, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d3 );

		mat = matrix( d1, [10,10], 'int32' );
		out = mean( mat, mat, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d2 );

		out = mean( mat, 2, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should evaluate the mean function for a matrix and a scalar and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 100 );
		d2 = new Uint16Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = MEAN( i, 2 );
		}
		mat = matrix( d1, [10,10], 'int16' );
		out = mean( mat, 2, {
			'dtype': 'uint16'
		});

		assert.strictEqual( out.dtype, 'uint16' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( mean( [], 1 ), [] );
		assert.deepEqual( mean( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( mean( new Int8Array(), 1 ), new Float64Array() );
	});


});
