options( digits = 16 )
library( jsonlite )

<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( '\n' ) %>
x = 0:24
y = <%= rName %>( x, <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> )

cat( y, sep = ",\n" )

data = list(
	<%= parameters.map( function( p ) { return p.name + ' = ' + p.name } ).join( ',\n\t' ) %>,
	data = x,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
