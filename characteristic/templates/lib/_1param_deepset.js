'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	<%= characteristic.toUpperCase() %>  = require( './number.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( <%=x%>, path[, sep] )
*	Computes the distribution <%= characteristic %> and deep sets the input array.
*
* @param {Array} <%=x%> - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function <%= characteristic %>( <%=x%>, path, sep ) {
	var len = <%=x%>.length,
		opts = {},
		dget,
		dset,
		v, i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			v = dget( <%=x%>[ i ] );
			if ( typeof v === 'number' ) {
				dset( <%=x%>[i], <%= characteristic.toUpperCase() %> ( v ) );
			} else {
				dset( <%=x%>[i], NaN );
			}
		}
	}
	return <%=x%>;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;
