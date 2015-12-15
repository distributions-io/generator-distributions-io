'use strict';

// MODULES //

var partial = require( './partial.js' );


// MGF //

/**
* FUNCTION: mgf( out, arr, <%= parameterArguments %> )
*	Evaluates the moment-generating function (MGF) for a <%= distribution %> distribution with <%= parameterDescriptions %> for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
<%= parameterDoc %>
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mgf( y, x, <%= parameterArguments %> ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( <%= parameterArguments %> );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
