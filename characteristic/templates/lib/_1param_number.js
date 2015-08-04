'use strict';

// MODULES //

<%- parameterModules %>


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION <%= characteristic %>( <%=x%> )
*	Computes the distribution <%= characteristic %> for a <%= distribution %> with parameter <%=x%>.
*
<%= parameterDoc %>
* @returns {Number} distribution <%= characteristic %>
*/
function <%= characteristic %>( <%=x%> ) {
<%- parameterChecks.join( '\n' ) -%>

	return <%- functionBody %>;
} // end FUNCTION <%= characteristic %>()


// EXPORTS

module.exports =  <%= characteristic %>;
