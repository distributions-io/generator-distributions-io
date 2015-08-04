'use strict';

var matrix = require( 'dstructs-matrix' ),
	mean = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
out = mean( data, 0.5 );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d.x;
	}
	return d;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = mean( data, 0.5, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
tmp = mean( data, 0.5 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = mean( mat, 0.5 );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = mean( mat, 0.5, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', out.dtype, out.toString() );
