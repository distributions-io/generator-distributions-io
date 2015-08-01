'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' );


// GET TYPE //

/**
* FUNCTION: getType( x )
*	Determines whether an input value is of a supported type.
*
* @param {*} x - input value
* @returns {String|Null} string indicating supported type or null
*/
function getType( x ) {
	if ( isNumber( x ) ) {
		return 'number';
	}
	if ( isMatrixLike( x ) ) {
		return 'matrix';
	}
	if ( isTypedArrayLike( x ) ) {
		return 'typedarray';
	}
	if ( isArrayLike( x ) ) {
		return 'array';
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
