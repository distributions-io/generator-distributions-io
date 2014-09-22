/**
*
*	DISTRIBUTIONS: <%= name %>
*
*
*	DESCRIPTION:
*		- <%= description %>
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) <%= year %>. <%= author %>.
*
*
*	AUTHOR:
*		<%= author %>. <%= email %>. <%= year %>.
*
*/

(function() {
	'use strict';

	// MODULES //

	// var module = require( 'module' );


	// DISTRIBUTION //

	/**
	* FUNCTION: Distribution()
	*	Distribution constructor.
	*
	* @constructor
	* @returns {Distribution} Distribution instance
	*/
	function Distribution() {
		return this;
	} // end FUNCTION Distribution()

	/**
	* METHOD: support()
	*	Returns the distribution support.
	*
	* @returns {Array} distribution support
	*/
	Distribution.prototype.support = function() {
		return null;
	}; // end METHOD support()

	/**
	* METHOD: mean( [value] )
	*	Mean value setter and getter. If a value is provided, sets the mean value. If no value is provided, returns the mean value.
	*
	* @param {Number} [value] - mean value
	* @returns {Distribution|Number} Distribution instance or mean value
	*/
	Distribution.prototype.mean = function( value ) {
		if ( !arguments.length ) {
			return null;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new TypeError( 'mean()::invalid input argument. Mean value must be numeric.' );
		}
		// this._mu = value;
		return this;
	}; // end METHOD mean()

	/**
	* METHOD: variance( [value] )
	*	Variance setter and getter. If a value is provided, sets the distribution variance. If no value is provided, returns the variance.
	*
	* @param {Number} [value] - variance
	* @returns {Distribution|Number} Distribution instance or variance
	*/
	Distribution.prototype.variance = function( value ) {
		if ( !arguments.length ) {
			return null;
		}
		if ( typeof value !== 'number' || value !== value || value < 0 ) {
			throw new TypeError( 'variance()::invalid input argument. Variance must be a positive number.' );
		}
		// this._variance = value;
		return this;
	}; // end METHOD variance()

	/**
	* METHOD: median()
	*	Returns the distribution median.
	*
	* @returns {Number} median
	*/
	Distribution.prototype.median = function( value ) {
		return null;
	}; // end METHOD median()

	/**
	* METHOD: mode()
	*	Returns the distribution mode.
	*
	* @returns {Number} mode
	*/
	Distribution.prototype.mode = function( value ) {
		return null;
	}; // end METHOD mode()

	/**
	* METHOD: skewness()
	*	Returns the distribution skewness.
	*
	* @returns {Number} skewness
	*/
	Distribution.prototype.skewness = function( value ) {
		return null;
	}; // end METHOD skewness()

	/**
	* METHOD: ekurtosis()
	*	Returns the distribution excess kurtosis.
	*
	* @returns {Number} excess kurtosis
	*/
	Distribution.prototype.ekurtosis = function( value ) {
		return null;
	}; // end METHOD ekurtosis()

	/**
	* METHOD: information()
	*	Returns the Fisher information.
	*
	* @returns {Array} Fisher information
	*/
	Distribution.prototype.information = function() {
		return null;
	}; // end METHOD information()

	/**
	* METHOD: entropy()
	*	Returns the entropy.
	*
	* @returns {Number} entropy
	*/
	Distribution.prototype.entropy = function() {
		return null;
	}; // end METHOD entropy()

	/**
	* METHOD: pdf( [vec] )
	*	If provided an input vector, evaluates the distribution PDF for each vector element. IF no input argument is provided, returns the PDF.
	*
	* @param {Array} [vec] - 1d input array
	* @returns {Function|Array} distribution PDF or evaluated PDF
	*/
	Distribution.prototype.pdf = function( vec ) {
		var pdf, len, arr, val;

		pdf = null;

		if ( !arguments.length ) {
			return pdf;
		}
		if ( !Array.isArray( vec ) ) {
			throw new TypeError( 'pdf()::invalid input argument. Must provide an array.' );
		}
		len = vec.length;
		arr = new Array( len );
		for ( var i = 0; i < len; i++ ) {
			val = vec[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				throw new TypeError( 'pdf()::invalid input argument. Array must only contain numeric values.' );
			}
			arr[ i ] = pdf( val );
		}
		return arr;
	}; // end METHOD pdf()

	/**
	* METHOD: cdf( [vec] )
	*	If provided an input vector, evaluates the distribution CDF for each vector element. IF no input argument is provided, returns the CDF.
	*
	* @param {Array} [vec] - 1d input array
	* @returns {Function|Array} distribution CDF or evaluated CDF
	*/
	Distribution.prototype.cdf = function( vec ) {
		var cdf, len, arr, val;

		cdf = null;

		if ( !arguments.length ) {
			return cdf;
		}
		if ( !Array.isArray( vec ) ) {
			throw new TypeError( 'cdf()::invalid input argument. Must provide an array.' );
		}
		len = vec.length;
		arr = new Array( len );
		for ( var i = 0; i < len; i++ ) {
			val = vec[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				throw new TypeError( 'cdf()::invalid input argument. Array must only contain numeric values.' );
			}
			arr[ i ] = cdf( val );
		}
		return arr;
	}; // end METHOD cdf()

	/**
	* METHOD: quantile( [vec] )
	*	If provided an input vector, evaluates the distribution quantile function for each vector element. If no input argument is provided, returns the quantile function.
	*
	* @param {Array} [vec] - 1d input array
	* @returns {Function|Array} distribution quantile function or evaluated quantile function
	*/
	Distribution.prototype.quantile = function( vec ) {
		var q, len, arr, val;

		q = null;

		if ( !arguments.length ) {
			return q;
		}
		if ( !Array.isArray( vec ) ) {
			throw new TypeError( 'quantile()::invalid input argument. Must provide an array.' );
		}
		len = vec.length;
		arr = new Array( len );
		for ( var i = 0; i < len; i++ ) {
			val = vec[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				throw new TypeError( 'quantile()::invalid input argument. Array must only contain numeric values.' );
			}
			if ( val < 0 || val > 1 ) {
				throw new Error( 'quantile()::invalid input argument. Array values must exist on the interval [0,1].' );
			}
			arr[ i ] = q( val );
		}
		return arr;
	}; // end METHOD quantile()


	// EXPORTS //

	module.exports = function createDistribution() {
		return new Distribution();
	};

})();