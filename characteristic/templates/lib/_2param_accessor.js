'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, <%- parameterArguments %>, accessor )
*	Computes the distribution mean for each array element pair using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} <%= x %> - input array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} <%= y %> - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mean( out, <%- parameterArguments %>, clbk ) {
	var len,
		v1,
		v2,
		i;

	if ( typeof <%=x%> === 'number' ) {
		len = <%=y%>.length;
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( <%=x%>, i, 0 );
			v2 = clbk( <%=y%>[ i ], i, 1 );
			out[ i ] = MEAN( v1, v2 );
		}
		return out;
	}
	len = <%=x%>.length;
	if ( typeof <%=y%> === 'number' ) {
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( <%= x %>[ i ], i, 0 );
			v2 = clbk( <%= y %>, i, 1 );
			out[ i ] = MEAN( v1, v2 );
		}
		return out;
	}
	if ( len !== <%=y%>.length ) {
		throw new Error( 'mean()::invalid input argument. Inputs arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		v1 = clbk( <%=x%>[ i ], i, 0 );
		v2 = clbk( <%=y%>[ i ], i, 1 );
		out[ i ] = MEAN( v1, v2 );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
