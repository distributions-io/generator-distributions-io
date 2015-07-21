options( digits = 16 )
library( jsonlite )

<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( '\n' ) %>
probs = 0:24 / 25
y = <%= rName %>( probs, <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> )

cat( y, sep = ",\n" )

data = list(
	<%= parameters.map( function( p ) { return p.name + ' = ' + p.name } ).join( ',\n\t' ) %>,
	data = probs,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
