'use strict';

// MODULES //

var <%= characteristic.toUpperCase() %> = require( './number.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( out, <%=x%>, accessor )
*	Computes the distribution <%= characteristic %> for parameters stored in an array using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} <%=x%> - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= characteristic %>( out, arr, clbk ) {
	var len = arr.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( arr[ i ], i );
		if ( typeof v === 'number' ) {
			out[ i ] = <%= characteristic.toUpperCase() %>( v );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;
