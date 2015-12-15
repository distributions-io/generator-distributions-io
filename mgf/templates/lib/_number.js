'use strict';

// FUNCTIONS //


// MGF //

/**
* FUNCTION: mgf( x, <%= parameterArguments %> )
*	Evaluates the moment-generating function (MGF) for a <%= distribution %> distribution with <%= parameterDescriptions %> at a value `t`.
*
* @param {Number} t - input value
<%= parameterDoc %>
* @returns {Number} evaluated MGF
*/
function mgf( t, <%= parameterArguments %> ) {

} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
