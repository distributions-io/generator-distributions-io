'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( <%= parameterArguments %> )
*	Partially applies <%= parameterDescriptions %> and returns a function for evaluating the probability density function (PDF) for a <%= distribution %> distribution.
*
<%= parameterDoc %>
* @returns {Function} PDF
*/
function partial( <%= parameterArguments %> ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a <%= distribution %> distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
