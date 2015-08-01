'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	getType = require( './getType.js' ),
	nans = require( './nans.js' );


// FUNCTIONS //

var fcns = require( './fcns.js' );


// MEAN //

/**
* FUNCTION: mean( <%- parameterArguments %>[, opts] )
*	Computes the distribution mean.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} <%=x%> - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} <%=y%> - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} mean function value(s)
*/
function mean( <%- parameterArguments %>, options ) {
	/* jshint newcap:false */
	var opts = {},
		<%=x%>Type,
		<%=y%>Type,
		<%=x%>Flg,
		<%=y%>Flg,
		ctor,
		err,
		fcn,
		len,
		out,
		dt,
		sh,
		d;

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	// Determine argument types...
	<%=x%>Type = getType( <%=x%> );
	<%=y%>Type = getType( <%=y%> );

	// Handle numeric inputs...
	if ( <%=x%>Type === 'number' && <%=y%>Type === 'number' ) {
		return fcns[ 'number-number' ]( <%=x%>, <%=y%> );
	}

	// Handle some cases where one or more arguments is not a supported type. Note that these cases are not exhaustive. Additional cases are handled by returning an appropriate data structure containing NaNs (see below).
	<%=x%>Flg = !<%=x%>Type;
	<%=y%>Flg = !<%=y%>Type;
	if (
		(<%=x%>Flg && <%=y%>Flg) ||
		(<%=x%>Flg && <%=y%>Type === 'number') ||
		(<%=y%>Flg && <%=x%>Type === 'number')
	) {
		return NaN;
	}

	// Determine the output data structure length...
	if (
		<%=x%>Type === 'matrix' ||
		<%=x%>Type === 'typedarray' ||
		<%=x%>Type === 'array'
	) {
		len = <%=x%>.length;
	}
	// `<%=x%>` is either a number or an unsupported type; in which case, `<%=y%>` must not be a number and must be a supported type...
	else {
		len = <%=y%>.length;
	}

	// Handle case where one or more inputs is a matrix...
	if ( <%=x%>Type === 'matrix' || <%=y%>Type === 'matrix' ) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'mean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix:
		d = new ctor( len );
		sh = ( <%=x%>Type === 'matrix' ) ? <%=x%>.shape : <%=y%>.shape;
		out = matrix( d, sh, dt );
	}
	// Handle typed-array output...
	else if ( opts.dtype || (<%=x%>Type === 'typedarray' && <%=y%>Type === 'typedarray') ) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'mean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		out = new ctor( len );
	}
	// If no dtype is specified and at least one argument is an array, output an array...
	else {
		out = new Array( len );
	}
	// Handle invalid types...
	if ( <%=x%>Type === null || <%=y%>Type === null ) {
		return ( out.data ) ? nans( out.data ) : nans( out );
	}
	// Get the implementation (note that only matrices cannot have accessors):
	if ( opts.accessor && <%=x%>Type !== 'matrix' && <%=y%>Type !== 'matrix' ) {
		fcn = fcns[ 'accessor' ];
		return fcn( out, <%=x%>, <%=y%>, opts.accessor );
	}
	fcn = fcns[ <%=x%>Type + '-' + <%=y%>Type ];

	// Handle invalid pairings...
	if ( !fcn ) {
		throw new Error( 'mean()::invalid input arguments. Unsupported argument pair: [' + <%=x%>Type + ', ' + <%=y%>Type + '].' );
	}
	return fcn( out, <%=x%>, <%=y%> );
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
