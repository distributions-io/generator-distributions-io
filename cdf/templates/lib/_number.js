'use strict';

// FUNCTIONS //


// CDF //

/**
* FUNCTION: cdf( x, <%= parameterArguments %> )
*	Evaluates the cumulative distribution function (CDF) for a <%= distribution %> distribution with <%= parameterDescriptions %> at a value `x`.
*
* @param {Number} x - input value
<%= parameterDoc %>
* @returns {Number} evaluated CDF
*/
function cdf( x, <%= parameterArguments %> ) {

} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
