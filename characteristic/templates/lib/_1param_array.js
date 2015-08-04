'use strict';

// MODULES //

var <%= characteristic.toUpperCase() %> = require( './number.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( out, <%=x%> )
*	Computes the distribution <%= characteristic %> for parameters stored in an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} <%=x%> - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= characteristic %>( out, arr ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof arr[ i ] === 'number' ) {
			out[ i ] = <%= characteristic.toUpperCase() %>( arr[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;
