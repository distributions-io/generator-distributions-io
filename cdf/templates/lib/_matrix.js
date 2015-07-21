'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, matrix, <%= parameterArguments %> )
*	Evaluates the cumulative distribution function (CDF) for a <%= distribution %> distribution with <%= parameterDescriptions %> for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
<%= parameterDoc %>
* @returns {Matrix} output matrix
*/
function cdf( y, x, <%= parameterArguments %> ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'cdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( <%= parameterArguments %> );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
