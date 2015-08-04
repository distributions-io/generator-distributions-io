Mean
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
var mean = require( '<%= name %>' );
```

#### mean( <%=x%>, <%=y%>[, options] )

Computes the [expected value](https://en.wikipedia.org/wiki/Expected_value) for a [<%= distribution %>](https://en.wikipedia.org/wiki/<%= distribution %>_distribution) distribution with parameters `<%=x%>` and `<%=y%>`.
(element-wise). `<%=x%>` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `<%=y%>` has to be either an `array` or `matrix` of equal dimensions as `<%=x%>` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	<%=x%>,
	mat,
	out,
	i;

out = mean( <%= xArray[ 0 ] %>, <%= yArray[ 0 ] %> );
// returns  <%= expectedArray[ 0 ] %>

<%=x%> = [ <%= xArray.join( ', ' ) %> ];
<%=y%> = [ <%= yArray.join( ', ' ) %> ]
out = mean( <%=x%>, <%=y%> );
// returns [ <%- expectedArray.join( ', ' ) %> ]

<%=x%> = new Int8Array( <%=x%> );
out = mean( <%=x%>, <%=y%> );
// returns Float64Array( [] )

<%=x%> =  matrix( [ <%= xArray.join( ', ') %> ], [2,2] );
<%=y%> =  matrix( [ <%= yArray.join( ', ') %> ], [2,2] );
/*
	[ <%= expectedArray[ 0 ] %>, <%= expectedArray[ 1 ] %>,
	  <%= expectedArray[ 2 ] %>, <%= expectedArray[ 3 ] %> ]
*/

<%=x%> = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	<%=x%>[ i ] = i * 5 + 5;
}
mat = matrix( <%=x%>, [3,2], 'float64' );
/*
	[ 5   10
	  15  20
	  25  30 ]
*/

out = mean( mat, 0.2 );
/*
	[

	]
*/
```

The function accepts the following `options`:

*	 __accessor__: accessor `function` for accessing `array` values.
*	 __dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var <%=x%> = [
	['beep', <%= xArray[ 0 ] %>],
	['boop', <%= xArray[ 1 ] %>],
	['bip', <%= xArray[ 2 ] %>],
	['bap', <%= xArray[ 3 ] %>]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mean( <%=x%>, 0.2, {
	'accessor': getValue
});
// returns [ ]
```

When computing the [expected value](https://en.wikipedia.org/wiki/Expected_value) for parameter values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var <%=x%> = [
	['beep', <%= xArray[ 0 ] %>],
	['boop', <%= xArray[ 1 ] %>],
	['bip',  <%= xArray[ 2 ] %>],
	['bap', <%= xArray[ 3 ] %>],
];

var <%=y%> = [
	{'y': <%= yArray[ 0 ] %>},
	{'y': <%= yArray[ 1 ] %>},
	{'y': <%= yArray[ 2 ] %>},
	{'y': <%= yArray[ 3 ] %>}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.y;
}

var out = mean( <%=x%>, <%=y%>, {
	'accessor': getValue
});
// returns [ <%= expectedArray.join( ', ' ) %> ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

## Notes

*	If an element is __not__ a numeric value, the evaluated [expected value](https://en.wikipedia.org/wiki/Expected_value) is `NaN`.

	``` javascript
	var <%=x%>, out;

	out = mean( null, 1 );
	// returns NaN

	out = mean( true, 1 );
	// returns NaN

	out = mean( {'a':'b'}, 1 );
	// returns NaN

	out = mean( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	<%=x%> = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mean( <%=x%>, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mean( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	 mean = require( 'compute-mean' );

var <%=x%>,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
<%=x%> = new Array( 10 );
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = Math.random();
}
out = mean( <%=x%>, 0.5 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = {
		'x': <%=x%>[ i ]
	};
}
out = mean( <%=x%>, 0.5, {
	'accessor': getValue
});

// Typed arrays...
<%=x%> = new Float32Array( 10 );
for ( i = 0; i < <%=x%>.length; i++ ) {
	<%=x%>[ i ] = Math.random();
}
tmp = mean( <%=x%>, 0.5 );
out = '';
for ( i = 0; i < <%=x%>.length; i++ ) {
	out += tmp[ i ];
	if ( i < <%=x%>.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( <%=x%>, [5,2], 'float32' );
out = mean( mat, 0.5 );

// Matrices (custom output data type)...
out = mean( mat, 0.5, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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
