'use strict';

/**
* FUNCTION: nans( x )
*	Fills an array with NaNs.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} input array
*/
function nans( x ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		x[ i ] = NaN;
	}
	return x;
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
