options( digits = 16 );
library( jsonlite );


<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( '\n' ) %>
x = c( -5, -2.5, 0, 2.5, 5 )
y = <%= rName %>( x, <%= parameters.map( function( p ) { return p.name } ).join( ',' ) %> )

cat( y, sep = ",\n" )

data = list(
	<%= parameters.map( function( p ) { return p.name + ' = ' + p.name } ).join( ',\n' ) %>,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
