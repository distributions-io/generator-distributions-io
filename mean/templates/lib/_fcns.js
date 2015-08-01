'use strict';

// Define the allowed argument pairs and store the respective implementations in a hash...
var fcns = {},
	pairs,
	i;

pairs = [
	'number-number',
	'number-typedarray',
	'number-array',
	'number-matrix',

	'typedarray-number',
	'typedarray-typedarray',
	'typedarray-array',

	'array-number',
	'array-typedarray',
	'array-array',

	'accessor',

	'matrix-number',
	'matrix-matrix'
];

for ( i = 0; i < pairs.length; i++ ) {
	fcns[ pairs[ i ] ] = require( './' + pairs[ i ] + '.js' );
}


// EXPORTS //

module.exports = fcns;
