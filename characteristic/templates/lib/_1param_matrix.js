'use strict';

// MODULES //

var <%= characteristic.toUpperCase() %> = require( './number.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( out, x )
*	Computes the distribution <%= characteristic %> for each parameter stored in a matrix.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function <%= characteristic %>( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( '<%= characteristic %>()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = <%= characteristic.toUpperCase() %>( x.data[ i ] );
	}
	return out;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;
