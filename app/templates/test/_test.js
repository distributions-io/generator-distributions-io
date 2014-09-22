
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createDist = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '<%= name %>', function tests() {
	'use strict';

	// SETUP //

	var dist;

	beforeEach( function() {
		dist = createDist();
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( createDist ).to.be.a( 'function' );
	});

	describe( 'support', function tests() {

		it( 'should provide a method to get the distribution support', function test() {
			expect( dist.support ).to.be.a( 'function' );
		});

		it( 'should return the support' );

	}); // end TESTS support

	describe( 'mean', function tests() {

		it( 'should provide a method for the distribution mean', function test() {
			expect( dist.mean ).to.be.a( 'function' );
		});

	}); // end TESTS mean

	describe( 'variance', function tests() {

		it( 'should provide a method for the distribution variance', function test() {
			expect( dist.variance ).to.be.a( 'function' );
		});

	}); // end TESTS variance

	describe( 'median', function tests() {

		it( 'should provide a method to get the distribution median', function test() {
			expect( dist.median ).to.be.a( 'function' );
		});

		it( 'should return the median value' );

	}); // end TESTS median

	describe( 'mode', function tests() {

		it( 'should provide a method to get the distribution mode', function test() {
			expect( dist.mode ).to.be.a( 'function' );
		});

		it( 'should return the mode' );

	}); // end TESTS mode

	describe( 'skewness', function tests() {

		it( 'should provide a method to get the distribution skewness', function test() {
			expect( dist.skewness ).to.be.a( 'function' );
		});

		it( 'should return the skewness' );

	}); // end TESTS skewness

	describe( 'excess kurtosis', function tests() {

		it( 'should provide a method to get the distribution excess kurtosis', function test() {
			expect( dist.ekurtosis ).to.be.a( 'function' );
		});

		it( 'should return the excess kurtosis' );

	}); // end TESTS kurtosis

	describe( 'entropy', function tests() {

		it( 'should provide a method to get the distribution entropy' );

		it( 'should return the distribution entropy' );

	}); // end TESTS entropy

	describe( 'information', function tests() {

		it( 'should provide a method to get the distribution information' );

		it( 'should return the distribution information' );

	}); // end TESTS information

	describe( 'pdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution PDF', function test() {
			expect( dist.pdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.pdf() ).to.be.a( 'function' );
		});

		it( 'should evaluate the pdf' );

	}); // end TESTS pdf

	describe( 'cdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution CDF', function test() {
			expect( dist.cdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.cdf() ).to.be.a( 'function' );
		});

		it( 'should evaluate the cdf' );

	}); // end TESTS cdf

	describe( 'quantile', function test() {

		it( 'should provide a method to get/evaluate the distribution quantile function' );

		it( 'should return a function' );

		it( 'should evaluate the quantile function' );

	}); // end TESTS quantile

});