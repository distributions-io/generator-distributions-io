'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var <%= characteristic %>1 = require( './number.js' ),
	<%= characteristic %>2 = require( './array.js' ),
	<%= characteristic %>3 = require( './accessor.js' ),
	<%= characteristic %>4 = require( './deepset.js' ),
	<%= characteristic %>5 = require( './matrix.js' ),
	<%= characteristic %>6 = require( './typedarray.js' );


// <%= characteristic.toUpperCase() %> //

/**
* FUNCTION: <%= characteristic %>( <%=x%>[, opts] )
*	Computes the distribution <%= characteristic %>.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} <%=x%> - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} distribution <%= characteristic %>(s)
*/
function <%= characteristic %>( <%=x%>, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( isNumber( <%=x%> ) || isnan( <%=x%> ) ) {
		return <%= characteristic %>1( <%=x%> );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( <%=x%> ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( '<%= characteristic %>()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( <%=x%>.length );
			out = matrix( d, <%=x%>.shape, dt );
		} else {
			out = <%=x%>;
		}
		return <%= characteristic %>5( out, <%=x%> );
	}
	if ( isTypedArrayLike( <%=x%> ) ) {
		if ( opts.copy === false ) {
			out = <%=x%>;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( '<%= characteristic %>()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( <%=x%>.length );
		}
		return <%= characteristic %>6( out, <%=x%> );
	}
	if ( isArrayLike( <%=x%> ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return <%= characteristic %>4( <%=x%>, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = <%=x%>;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( '<%= characteristic %>()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( <%=x%>.length );
		}
		else {
			out = new Array( <%=x%>.length );
		}
		if ( opts.accessor ) {
			return <%= characteristic %>3( out, <%=x%>, opts.accessor );
		}
		return <%= characteristic %>2( out, <%=x%> );
	}
	return NaN;
} // end FUNCTION <%= characteristic %>()


// EXPORTS //

module.exports = <%= characteristic %>;