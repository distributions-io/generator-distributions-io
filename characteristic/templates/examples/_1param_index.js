'use strict';

var matrix = require( 'dstructs-matrix' ),
	<%= characteristic %> = require( './../lib' );

var <%=x%>,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
<%=x%> = new Array( 10 );
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = i;
}
out = <%= characteristic %>( <%=x%> );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = {
		'x': <%=x%>[ i ]
	};
}
out = <%= characteristic %>( <%=x%>, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Deep set arrays...
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = {
		'x': [ i, <%=x%>[ i ].x ]
	};
}
out = <%= characteristic %>( <%=x%>, {
	'path': 'x/1',
	'sep': '/'
});
console.log( 'Deepset:');
console.dir( out );
console.log( '\n' );


// ----
// Typed arrays...
<%=x%> = new Int32Array( 10 );
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = i;
}
tmp = <%= characteristic %>( <%=x%> );
out = '';
for ( i = 0; i < <%=x%>.length; i++ ) {
	out += tmp[ i ];
	if ( i < <%=x%>.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( <%=x%>, [5,2], 'int32' );
out = <%= characteristic %>( mat );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = <%= characteristic %>( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', out.dtype, out.toString() );
