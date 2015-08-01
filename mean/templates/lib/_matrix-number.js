'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, <%- parameterArguments %> )
*	Computes the distribution mean for each matrix element pair.
*
* @param {Matrix} out - output matrix
* @param {Matrix} <%=x%> - input matrix
* @param {Number} <%=y%> - scalar
* @returns {Matrix} output matrix
*/
function mean( out, <%- parameterArguments %> ) {
	var len = <%=x%>.length,
		i;

	if ( out.length !== len ) {
		throw new Error( 'mean()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = MEAN( <%=x%>.data[ i ], <%=y%> );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
