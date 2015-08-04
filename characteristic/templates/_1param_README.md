<%= characteristic.charAt(0).toUpperCase() + characteristic.slice(1) %>
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [<%= distribution %>](https://en.wikipedia.org/wiki/<%= distribution %>_distribution) distribution [expected value](https://en.wikipedia.org/wiki/Expected_value).

The [expected value](https://en.wikipedia.org/wiki/Expected_value) for a [<%= distribution %>](https://en.wikipedia.org/wiki/<%= distribution %>_distribution) random variable is

<div class="equation" align="center" data-raw-text="\mathbb{E}\left[ X \right] = " data-equation="eq:expectation">
	<img src="" alt="Expected value for a <%= distribution %> distribution.">
	<br>
</div>

where <%= parameters
	.map( function( p ) {
		return '`' + p.name + '` is the ' + p.description;
	})
	.join( ' and ' );%>.


## Installation

``` bash
$ npm install <%= name %>
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var <%= characteristic %> = require( '<%= name %>' );
```

#### <%= characteristic %>( <%=x%>[, opts] )

Computes the [expected value](https://en.wikipedia.org/wiki/Expected_value) for a [<%= distribution %>](https://en.wikipedia.org/wiki/<%= distribution %>_distribution) distribution with parameter `<%=x%>` . `<%=x%>` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = <%= characteristic %>( <%=xArray[0]%> );
// returns <%= expectedArray[0] %>

<%=x%> = [ <%= xArray.join( ', ' ) %> ];
out = <%= characteristic %>( <%=x%> );
// returns [ <%= expectedArray.join( ', ' ) %> ]

<%=x%> = new Float32ArrayArray( <%=x%> );
out = <%= characteristic %>( <%=x%> );
// returns Float64Array( [<%= expectedArray.join( ',' ) %>] )

<%=x%> =  matrix( [ <%= xArray.join( ', ') %> ], [2,2] );
/*
	[ <%= xArray[ 0 ] %>, <%= xArray[ 1 ] %>,
	  <%= xArray[ 2 ] %>, <%= xArray[ 3 ] %> ]
*/

out = <%= characteristic %>( <%=x%> );
/*
	[ <%= expectedArray[ 0 ] %>, <%= expectedArray[ 1 ] %>,
	  <%= expectedArray[ 2 ] %>, <%= expectedArray[ 3 ] %> ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var <%=x%> = [
	[0,<%= xArray[ 0 ] %>],
	[1,<%= xArray[ 1 ] %>],
	[2,<%= xArray[ 2 ] %>],
	[3,<%= xArray[ 3 ] %>]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = <%= characteristic %>( <%=x%>, {
	'accessor': getValue
});
// returns [ <%= expectedArray.join( ', ' ) %> ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var <%=x%> = [
	{'x':[9,<%= xArray[ 0 ] %>]},
	{'x':[9,<%= xArray[ 1 ] %>]},
	{'x':[9,<%= xArray[ 2 ] %>]},
	{'x':[9,<%= xArray[ 3 ] %>]}
];

var out = <%= characteristic %>( <%=x%>, 'x|1', '|' );
/*
	[
		{'x':[9,<%= expectedArray[ 0 ] %>]},
		{'x':[9,<%= expectedArray[ 1 ] %>]},
		{'x':[9,<%= expectedArray[ 2 ] %>]},
		{'x':[9,<%= expectedArray[ 3 ] %>]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var <%=x%>, out;

<%=x%> = new Float64Array( [ <%= xArray %> ] );

out = <%= characteristic %>( <%=x%>, {
	'dtype': 'int32'
});
// returns Int32Array( [ <%= expectedArray.map( function(x) { return Math.floor(x)}).join(',') %> ] )

// Works for plain arrays, as well...
out = <%= characteristic %>( [<%= xArray %>], {
	'dtype': 'int32'
});
// returns Int32Array( [ <%= expectedArray.map( function(x) { return Math.floor(x)}).join(',') %> ] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var <%=x%>,
	bool,
	mat,
	out,
	i;

<%=x%> = [ <%= xArray.join( ', ' ) %> ];

out = <%= characteristic %>( <%=x%>, {
	'copy': false
});
// returns [ <%= expectedArray.join( ', ' ) %> ]

bool = ( data === out );
// returns true

mat = matrix( [ <%= xArray.join( ', ') %> ], [2,2] );
/*
	[ <%= xArray[ 0 ] %>, <%= xArray[ 1 ] %>,
	  <%= xArray[ 2 ] %>, <%= xArray[ 3 ] %> ]
*/

out = <%= characteristic %>( mat, {
	'copy': false
});
/*
	[ <%= expectedArray[ 0 ] %>, <%= expectedArray[ 1 ] %>,
	  <%= expectedArray[ 2 ] %>, <%= expectedArray[ 3 ] %> ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated principal [square root](https://en.wikipedia.org/wiki/Square_root) is `NaN`.

	``` javascript
	var data, out;

	out = <%= characteristic %>( null );
	// returns NaN

	out = <%= characteristic %>( true );
	// returns NaN

	out = <%= characteristic %>( {'a':'b'} );
	// returns NaN

	out = <%= characteristic %>( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = <%= characteristic %>( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = <%= characteristic %>( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = <%= characteristic %>( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	<%= characteristic %> = require( '<%= name %>' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = <%= characteristic %>( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = <%= characteristic %>( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = <%= characteristic %>( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i
}
out = <%= characteristic %>( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = <%= characteristic %>( mat );

// Matrices (custom output data type)...
out = <%= characteristic %>( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; <%= year %>. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/<%= name %>.svg
[npm-url]: https://npmjs.org/package/<%= name %>

[travis-image]: http://img.shields.io/travis/distributions-io/<%= repo %>/master.svg
[travis-url]: https://travis-ci.org/distributions-io/<%= repo %>

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/<%= repo %>/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/<%= repo %>?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/<%= repo %>.svg
[dependencies-url]: https://david-dm.org/distributions-io/<%= repo %>

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/<%= repo %>.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/<%= repo %>

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/<%= repo %>.svg
[github-issues-url]: https://github.com/distributions-io/<%= repo %>/issues
