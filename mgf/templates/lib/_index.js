'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var mgf1 = require( './number.js' ),
	mgf2 = require( './array.js' ),
	mgf3 = require( './accessor.js' ),
	mgf4 = require( './deepset.js' ),
	mgf5 = require( './matrix.js' ),
	mgf6 = require( './typedarray.js' );


// MGF //

/**
* FUNCTION: mgf( t[, opts] )
*	Evaluates the moment-generating function (MGF) for a <%= distribution %> distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} t - input value
* @param {Object} [opts] - function options
<%= optsParameters %>
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated MGF
*/
function mgf( t, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	<%- setDefaults  %>

	if ( isNumber( t ) ) {
		return mgf1( t, <%= optsArguments %> );
	}
	if ( isMatrixLike( t ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'mgf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( t.length );
			out = matrix( d, t.shape, dt );
		} else {
			out = t;
		}
		return mgf5( out, t, <%= optsArguments %> );
	}
	if ( isTypedArrayLike( t ) ) {
		if ( opts.copy === false ) {
			out = t;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'mgf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( t.length );
		}
		return mgf6( out, t, <%= optsArguments %> );
	}
	if ( isArrayLike( t ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return mgf4( t, <%= optsArguments %>, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = t;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'mgf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( t.length );
		}
		else {
			out = new Array( t.length );
		}
		if ( opts.accessor ) {
			return mgf3( out, t, <%= optsArguments %>, opts.accessor );
		}
		return mgf2( out, t, <%= optsArguments %> );
	}
	return NaN;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
