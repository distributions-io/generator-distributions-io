'use strict';

// MODULES //

var path = require( 'path' ),
	yeoman = require( 'yeoman-generator' ),
	yosay = require( 'yosay' ),
	shell = require( 'shelljs' ),
	npmName = require( 'npm-name' ),
	chalk = require( 'chalk' );


// FUNCTIONS //

/**
* FUNCTION: git( name )
*	Initializes and runs git.
*
* @private
* @param {String} name - repo name
*/
function git( name ) {
	var cmd = 'git remote add origin https://github.com/distributions-io/' + name + '.git';

	// Initialize the repository:
	shell.exec( 'git init' );
	shell.exec( cmd );
	shell.exec( 'git add -A' );
	shell.exec( 'git commit -m "[INIT]"' );
} // end FUNCTION git()


// GENERATOR //

var Generator = yeoman.generators.Base.extend({

	/**
	* METHOD: init()
	*	Generator initialization.
	*/
	init: function() {
		var flg = this.options[ 'skip-message' ];

		this.pkg = require( '../package.json' );
		this.year = (new Date() ).getFullYear();

		if ( typeof flg === 'undefined' || !flg ) {
			this.log( yosay( 'Welcome to the Distributions.io generator...' ) );
		}
	},

	/**
	* METHOD: promptUser()
	*	Prompts a user for input relevant to the validation module.
	*/
	promptUser: function() {
		var next = this.async(),
			regex = /^distributions\-/,
			flg,
			dirname,
			prompts,
			git,
			user,
			email;

		// Output flag:
		flg = this.options[ 'skip-message' ];

		// Initialize defaults:
		user = '';
		email = '';

		// Check if the user has Git:
		git = shell.which( 'git' );

		if ( git ) {
			user = shell.exec( 'git config --get user.name', { silent: true } ).output.trim();
			email = shell.exec( 'git config --get user.email', { silent: true } ).output.trim();
		}

		// Get the current directory name:
		dirname = path.basename( process.cwd() );

		// Inform the user as to naming conventions:
		if ( typeof flg === 'undefined' || !flg ) {
			this.log( yosay( 'The module name should follow the convention `distributions-{name}`, where `name` is a unique ID not already in use on NPM or within the Distributions.io organization on Github.' ) );
		}

		// Specify the input prompts required in order to tailor the module...
		prompts = [
			{
				'type': 'input',
				'name': 'name',
				'message': 'What is the module name?',
				'default': dirname,
				validate: function ( answer ) {
					var next = this.async();

					if ( !regex.test( answer ) ) {
						next( 'The provided name is not prefixed with `distributions-`.' );
					}
					npmName( answer, function onResponse( error, available ) {
						if ( error ) {
							next( 'Unable to check availability on NPM: ' + error );
							return;
						}
						if ( !available ) {
							// Ask for another name:
							next( 'The requested module name already exists on NPM.' );
							return;
						}
						next( true );
					});
				}
			},
			{
				'type': 'confirm',
				'name': 'git',
				'message': 'Create a new git repository?',
				'default': true,
				validate: function( answer ) {
					if ( answer && !git ) {
						return 'Unable to find git. Ensure that you have git installed.';
					}
					return true;
				}
			},
			{
				when: function( answers ) {
					if ( answers.git ) {
						return true;
					}
					return false;
				},
				'type': 'input',
				'name': 'repo',
				'message': 'Git repository name?',
				default: function( answers ) {
					var name = answers.name.replace( 'distributions-', '' );
					return name;
				}
			},
			{
				'type': 'input',
				'name': 'author',
				'message': 'Primary author\'s name?'
			},
			{
				'type': 'input',
				'name': 'email',
				'message': 'Primary author\'s contact e-mail?',
				default: function( answers ) {
					return ( answers.git ) ? email : '';
				}
			},
			{
				'type': 'input',
				'name': 'description',
				'message': 'Module description:',
				'default': 'Distribution.'
			}
		];

		// Prompt the user for responses:
		this.prompt( prompts, function onAnswers( answers ) {
			this.author = answers.author;
			this.email = answers.email;
			this.moduleName = answers.name;
			this.description = answers.description;
			this.git = answers.git;
			this.repo = answers.repo;

			next();
		}.bind( this ) );
	}, // end METHOD promptUser()

	/**
	* METHOD: mkdirs()
	*	Creates module directories.
	*/
	mkdirs: function() {
		this.mkdir( 'benchmark' );
		this.mkdir( 'examples' );
		this.mkdir( 'lib' );
		this.mkdir( 'test' );
	}, // end METHOD mkdirs()

	/**
	* METHOD: dotFiles()
	*	Copies over base dot files.
	*/
	dotFiles: function() {
		this.copy( 'gitignore', '.gitignore' );
		this.copy( 'gitattributes', '.gitattributes' );
		this.copy( 'npmignore', '.npmignore' );
		this.copy( 'travis.yml', '.travis.yml' );
		this.copy( 'jshintrc', '.jshintrc' );
		this.copy( 'jshintignore', '.jshintignore' );
		this.copy( 'editorconfig', '.editorconfig' );
	}, // end METHOD dotfiles()

	/**
	* METHOD: makefile()
	*	Copies over base Makefile.
	*/
	makefile: function() {
		this.copy( '_Makefile', 'Makefile' );
	}, // end METHOD makefile()

	/**
	* METHOD: license()
	*	Creates a license file.
	*/
	license: function() {
		var context = {
				'year': this.year
			};

		this.template( '_LICENSE', 'LICENSE', context );
	}, // end METHOD license()

	/**
	* METHOD: package()
	*	Creates a `package.json` file.
	*/
	package: function() {
		var context = {
				'name': this.moduleName,
				'repo': this.repo,
				'author': this.author,
				'email': this.email,
				'description': this.description
			};

		this.template( '_package.json', 'package.json', context );
	}, // end METHOD package()

	/**
	* METHOD: todo()
	*	Copies over a TODO file.
	*/
	todo: function() {
		this.copy( '_TODO.md', 'TODO.md' );
	}, // end METHOD todo()

	/**
	* METHOD: readme()
	*	Creates a boilerplate README.
	*/
	readme: function() {
		var context = {
				'title': this.moduleName.split('-').slice(1).join('-'),
				'name': this.moduleName,
				'repo': this.repo,
				'author': this.author,
				'year': this.year,
				'description': this.description
			};

		this.template( '_README.md', 'README.md', context );
	}, // end METHOD readme()

	/**
	* METHOD: lib()
	*	Creates a module boilerplate.
	*/
	lib: function() {
		this.template( 'lib/_index.js', 'lib/index.js' );
	}, // end METHOD lib()

	/**
	* METHOD: test()
	*	Creates a test boilerplate.
	*/
	test: function() {
		var context = {
				'name': this.moduleName
			};

		this.template( 'test/_test.js', 'test/test.js', context );
	}, // end METHOD test()

	/**
	* METHOD: examples()
	*	Copies a boilerplate example.
	*/
	examples: function() {
		this.copy( 'examples/_index.js', 'examples/index.js' );
	}, // end METHOD examples()

	/**
	* METHOD: install()
	*	Initializes git and installs dependencies.
	*/
	install: function() {
		var config = {
				'bower': false,
				'npm': true,
				'skipInstall': this.options[ 'skip-install' ],
				'skipMessage': false,
				'callback': function onFinish() {
					console.log( '\n...finished.\n' );
				}
			};

		this.on( 'end', function onEnd() {
			if ( this.git ) {
				console.log( '\n...initializing git...\n' );
				git( this.repo );
				console.log( '\n...initialized git.\n' );
			}
			this.installDependencies( config );
		});
	} // end METHOD install()

});


// EXPORTS //

module.exports = Generator;
