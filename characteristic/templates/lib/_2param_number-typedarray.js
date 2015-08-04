'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, <%- parameterArguments %> )
*	Computes the distribution mean for each typed-array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number} <%-x%> - scalar
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} <%-y%> - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mean( out, <%- parameterArguments %> ) {
	var len = <%-y%>.length,
		i;

	for ( i = 0; i < len; i++ ) {
		out[ i ] = MEAN( <%-x%>, <%-y%>[ i ] );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
