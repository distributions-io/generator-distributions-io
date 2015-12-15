'use strict';

// MODULES //

var partial = require( './partial.js' );


// MGF //

/**
* FUNCTION: mgf( out, matrix, <%= parameterArguments %> )
*	Evaluates the moment-generating function (MGF) for a <%= distribution %> distribution with <%= parameterDescriptions %> for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
<%= parameterDoc %>
* @returns {Matrix} output matrix
*/
function mgf( y, x, <%= parameterArguments %> ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'mgf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( <%= parameterArguments %> );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
