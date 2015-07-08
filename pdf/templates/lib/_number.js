'use strict';

// FUNCTIONS //


// PDF //

/**
* FUNCTION: pdf( x, <%= parameterArguments %> )
*	Evaluates the probability density function (PDF) for a <%= distribution %> distribution with  <%= parameterDescriptions %> at a value `x`.
*
* @param {Number} x - input value
<%= parameterDoc %>
* @returns {Number} evaluated PDF
*/
function pdf( x, <%= parameterArguments %> ) {

} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
