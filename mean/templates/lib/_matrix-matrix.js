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
* @param {Matrix} <%=y%> - input matrix
* @returns {Matrix} output matrix
*/
function mean( out, <%- parameterArguments %> ) {
	var len = <%=x%>.length,
		M, N,
		i, j;

	if ( out.length !== len ) {
		throw new Error( 'mean()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	M = <%=x%>.shape[ 0 ];
	N = <%=x%>.shape[ 1 ];
	if ( M !== <%=y%>.shape[ 0 ] || N !== <%=y%>.shape[ 1 ] ) {
		throw new Error( 'mean()::invalid input arguments. Both matrices must have the same dimensions.' );
	}
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			out.set( i, j, MEAN( <%=x%>.get( i, j ), <%=y%>.get( i, j ) ) );
		}
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
