/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var path = require( 'path' ),
	yeoman = require( 'yeoman-generator' );


// VARIABLES //

var helpers = yeoman.test,
	assert = yeoman.assert;


// TESTS //

describe( 'distributions-io generator', function tests() {

	// SETUP //

	beforeEach( function setup( done ) {
		helpers
			.run( path.join( __dirname, '../app' ) )
			.inDir( path.join( __dirname, 'tmp' ) )
			.withOptions({
				'skip-install': true,
				'skip-install-message': true,
				'skip-message': true
			})
			.withPrompts({
				'name': 'distributions-generator-test',
				'author': 'Jane Doe',
				'email': 'jane@doe.com',
				'license_holder': 'Jane Doe &lt;jane@doe.com&gt;',
				'description': 'Distributions.io generator test module.',
				'git': false
			})
			.on( 'ready', function onReady( generator ) {
				// Called before `generator.run()` is called.
			})
			.on( 'end', function onEnd() {
				done();
			});
	});


	// TESTS //

	it( 'creates expected files', function test() {
		var expected = [
				'.gitignore',
				'.npmignore',
				'.travis.yml',
				'README.md',
				'TODO.md',
				'Makefile',
				'LICENSE',
				'package.json',
				'examples/index.js',
				'test/test.js',
				'lib/index.js'
			];

		assert.file( expected );
	});
});
