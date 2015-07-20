'use strict';

// FUNCTIONS //


// QUANTILE //

/**
* FUNCTION: quantile( p, <%= parameterArguments %> )
*	Evaluates the quantile function for a <%= distribution %> distribution with <%= parameterDescriptions %> at a probability `p`.
*
* @param {Number} p - input value
<%= parameterDoc %>
* @returns {Number} evaluated quantile function
*/
function quantile( p, <%= parameterArguments %> ) {
	if ( p !== p || p < 0 || p > 1 ) {
		return NaN;
	}
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
