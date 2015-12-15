using Distributions
using JSON

<%= parameters.map( function( p ) { return p.name + ' = ' + p.default } ).join( '\n' ) %>
d = <%= rName %>( <%= parameters.map( function( p ) { return p.name } ).join( ',' ) %> )

x = [ -5, -2.5, 0, 2.5, 5 ]

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	<%- parameters.map( function( p ) { return '("' + p.name + '", ' + p.name + ")" } ).join( ',\n\t' ) %>,
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/number.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
