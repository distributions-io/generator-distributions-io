options( digits = 16 )
library( jsonlite )


<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( '\n' ) %>
probs = c( 0, 0.25, 0.5, 0.75, 1 )
y = <%= rName %>( probs, <%= parameters.map( function( p ) { return p.name } ).join( ', ' ) %> )

cat( y, sep = ",\n" )

data = list(
	<%= parameters.map( function( p ) { return p.name + ' = ' + p.name } ).join( ',\n\t' ) %>,
	data = probs,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/partial.json" )
