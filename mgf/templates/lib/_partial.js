'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( <%= parameterArguments %> )
*	Partially applies <%= parameterDescriptions %> and returns a function for evaluating the moment-generating function (MGF) for a <%= distribution %> distribution.
*
<%= parameterDoc %>
* @returns {Function} MGF
*/
function partial( <%= parameterArguments %> ) {

	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment-generating function (MGF) for a <%= distribution %> distribution.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
