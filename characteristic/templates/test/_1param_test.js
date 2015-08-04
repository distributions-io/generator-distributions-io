/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	<%= characteristic %> = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-<%= characteristic %>', function tests() {

	it( 'should export a function', function test() {
		expect( <%= characteristic %> ).to.be.a( 'function' );
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
				<%= characteristic %>( [1,2,3], {
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
				<%= characteristic %>( [1,2,3], {
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
				<%= characteristic %>( new Int8Array([1,2,3]), {
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
				<%= characteristic %>( matrix( [2,2] ), {
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
			assert.isTrue( isnan( <%= characteristic %>( values[ i ] ) ) );
		}
	});

	it( 'should compute the distribution <%= characteristic %> when provided a number', function test() {
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 0 ] %> ), <%= expectedArray[ 0 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 1 ] %>  ), <%= expectedArray[ 1 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 2 ] %>  ), <%= expectedArray[ 2 ] %> );
		assert.strictEqual( <%= characteristic %>( <%= xArray[ 3 ] %>  ), <%= expectedArray[ 3 ] %> );
	});

	it( 'should compute the distribution <%= characteristic %> when provided a plain array', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [ <%= xArray.join( ', ' ) %> ];
		expected = [ <%= expectedArray.join( ', ' ) %> ];

		actual = <%= characteristic %>( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = <%= characteristic %>( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the distribution <%= characteristic %> when provided a typed array', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = new Float64Array ( [ <%= xArray.join( ',' ) %> ] );
		expected = new Float64Array( [ <%= expectedArray.join( ',' ) %> ] );

		actual = <%= characteristic %>( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = <%= characteristic %>( data, {
			'copy': false
		});
		expected = new Float64Array( [ <%= expectedArray.join( ',' ) %> ] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the distribution <%= characteristic %> and return an array of a specific type', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [ <%= xArray.join( ', ' ) %> ];
		expected = new Int32Array( [ <%= expectedArray.join( ',' ) %> ] );

		actual = <%= characteristic %>( data, {
			'dtype': 'int32'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 4 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute the distribution <%= characteristic %> using an accessor', function test() {
		var <%=x%>, actual, expected;

		<%=x%> = [
			{'<%=x%>':<%= xArray[ 0 ] %>},
			{'<%=x%>':<%= xArray[ 1 ] %>},
			{'<%=x%>':<%= xArray[ 2 ] %>},
			{'<%=x%>':<%= xArray[ 3 ] %>}
		];
		expected = [ <%= expectedArray.join( ', ' ) %> ];

		actual = <%= characteristic %>( <%=x%>, {
			'accessor': getValue
		});
		assert.notEqual( actual, <%=x%> );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = <%= characteristic %>( <%=x%>, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, <%=x%> );
		assert.deepEqual( <%=x%>, expected );

		function getValue( d ) {
			return d.<%=x%>;
		}
	});

	it( 'should compute an element-wise distribution <%= characteristic %> and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[9,<%= xArray[ 0 ] %>]},
			{'x':[9,<%= xArray[ 1 ] %>]},
			{'x':[9,<%= xArray[ 2 ] %>]},
			{'x':[9,<%= xArray[ 3 ] %>]}
		];

		expected = [
			{'x':[9,<%= expectedArray[ 0 ] %>]},
			{'x':[9,<%= expectedArray[ 1 ] %>]},
			{'x':[9,<%= expectedArray[ 2 ] %>]},
			{'x':[9,<%= expectedArray[ 3 ] %>]}
		];

		actual = <%= characteristic %>( data, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[9,<%= xArray[ 0 ] %>]},
			{'x':[9,<%= xArray[ 1 ] %>]},
			{'x':[9,<%= xArray[ 2 ] %>]},
			{'x':[9,<%= xArray[ 3 ] %>]}
		];

		actual = <%= characteristic %>( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute an element-wise distribution <%= characteristic %> when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Int16Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = i;
			d3[ i ] = i;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = <%= characteristic %>( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = <%= characteristic %>( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should compute an element-wise distribution <%= characteristic %> and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = i;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = <%= characteristic %>( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( <%= characteristic %>( [] ), [] );
		assert.deepEqual( <%= characteristic %>( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( <%= characteristic %>( new Int8Array() ), new Float64Array() );
	});

});
