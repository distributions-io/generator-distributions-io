'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( <%= parameterArguments %> )
*	Partially applies <%= parameterDescriptions %> and returns a function for evaluating the cumulative distribution function (CDF) for a <%= distribution %> distribution.
*
<%= parameterDoc %>
* @returns {Function} CDF
*/
function partial( <%= parameterArguments %> ) {

	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a <%= distribution %> distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
