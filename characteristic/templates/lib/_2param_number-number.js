'use strict';

// MODULES //

<%- parameterModules %>

// MEAN //

/**
* FUNCTION mean( <%= parameterArguments %> )
*	Computes the mean for a <%= distribution %> distribution with <%= parameterDescriptions %>.
*
<%= parameterDoc %>
* @returns {Number} distribution mean
*/
function mean( <%= parameterArguments %> ){
<%- parameterChecks.join( '\n' ) -%>

	return <%- functionBody %>;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
