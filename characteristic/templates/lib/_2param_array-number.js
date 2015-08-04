'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, <%- parameterArguments %> )
*	Computes the distribution mean for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} <%=x%> - input array
* @param {Number} <%=y%> - scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mean( out, <%- parameterArguments %> ) {
	var len = <%=x%>.length,
		i;

	for ( i = 0; i < len; i++ ) {
		out[ i ] = MEAN( <%=x%>[ i ], <%=y%> );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
