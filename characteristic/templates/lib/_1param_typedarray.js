'use strict';

// MODULES //

var <%= characteristic.toUpperCase() %> = require( './number.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( out, <%=x%> )
*	Computes the distribution <%= characteristic %> for parameters stored in a typed array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} <%=x%> - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function <%= characteristic %>( out, <%=x%> ) {
	var len = <%=x%>.length,
		i;
	for ( i = 0; i < len; i++ ) {
		out[ i ] = <%= characteristic.toUpperCase() %>( <%=x%>[ i ] );
	}
	return out;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;
