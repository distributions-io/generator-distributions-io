'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, matrix, <%= parameterArguments %> )
*	Evaluates the quantile function for a <%= distribution %> distribution with <%= parameterDescriptions %> for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
<%= parameterDoc %>
* @returns {Matrix} output matrix
*/
function quantile( y, x, <%= parameterArguments %> ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'quantile()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( <%= parameterArguments %> );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
