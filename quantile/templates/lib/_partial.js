'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( <%= parameterArguments %> )
*	Partially applies <%= parameterDescriptions %> and returns a function for evaluating the quantile function for a <%= distribution %> distribution.
*
<%= parameterDoc %>
* @returns {Function} quantile function
*/
function partial( <%= parameterArguments %> ) {

	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function for a <%= distribution %> distribution.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		if ( p !== p || p < 0 || p > 1 ) {
			return NaN;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
