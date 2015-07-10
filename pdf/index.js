'use strict';

// MODULES //

var path = require( 'path' ),
	isArray = require( 'validate.io-array' ),
	yeoman = require( 'yeoman-generator' ),
	yosay = require( 'yosay' ),
	shell = require( 'shelljs' ),
	mkdirp = require('mkdirp'),
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
				'name': 'distribution',
				'message': 'Name of the distribution:',
				'default': 'Distribution.'
			}
		];

		// Prompt the user for responses:
		this.prompt( prompts, function onAnswers( answers ) {
			this.author = answers.author;
			this.email = answers.email;
			this.moduleName = answers.name;
			this.distribution = answers.distribution;
			this.git = answers.git;
			this.repo = answers.repo;
			next();
		}.bind( this ) );

	}, // end METHOD promptUser()

	/**
	* METHOD: promptParameters()
	*	Prompts a user for the parameters of the distribution.
	*/
	promptParameters: function() {
		var next = this.async();

		var parameterPrompt = [
			{
				'type': 'input',
				'name': 'parameterName',
				'message': 'Parameter name?'
			},
			{
				'type': 'input',
				'name': 'parameterDescription',
				'message': 'Parameter description?'
			},
			{
				'type': 'input',
				'name': 'parameterDefault',
				'message': 'Parameter default value?'
			},
			{
				type: 'list',
				name: 'parameterDomain',
				message: 'What values can the parameter take?',
				choices: [
				  'Real numbers',
				  'Positive real numbers',
				  'Non-negative integers'
				]
			},
			{
				'type': 'confirm',
				'name': 'continue',
				'message': 'Enter an additional parameter?',
				'default': true,
			}
		];

		function getParameters( self ) {
			self.prompt( parameterPrompt, function onAnswers( answers ) {
				if ( !isArray( self.parameters ) ) {
					self.parameters = [];
				}
				var param = {
					'name': answers.parameterName,
					'description': answers.parameterDescription,
					'default': answers.parameterDefault,
					'domain': answers.parameterDomain
				};
				self.parameters.push( param );
				if ( answers.continue === true ) {
					getParameters( self );
				} else {
					next();
				}
			}.bind( self ) );
		}

		getParameters( this );

	}, // end METHOD promptParameters()

	/**
	* METHOD: mkdirs()
	*	Creates module directories.
	*/
	mkdirs: function() {
		mkdirp( 'benchmark' );
		mkdirp( 'examples' );
		mkdirp( 'lib' );
		mkdirp( 'test' );
		mkdirp( 'docs/img' );
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

		this.fs.copyTpl(
			this.templatePath( '_LICENSE' ),
			this.destinationPath( 'LICENSE' ),
			context
		);
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
				'distribution': this.distribution
			};

		this.fs.copyTpl(
			this.templatePath( '_package.json' ),
			this.destinationPath( 'package.json' ),
			context
		);
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
				'distribution': this.distribution,
				'parameters': this.parameters
			};

		this.fs.copyTpl(
			this.templatePath( '_README.md'),
			this.destinationPath( 'README.md' ),
			context
		);

	}, // end METHOD readme()

	/**
	* METHOD: lib()
	*	Creates a module boilerplate.
	*/
	lib: function() {

		var parameterModules = {};

		var context = {
			'distribution': this.distribution,
			'parameterDescriptions': this.parameters.map( function( p ) {
				return p.description + ' `' + p.name + '`';
			}).join( ' and ' ),
			'parameterArguments': this.parameters.map( function( p ) {
				return p.name;
			}).join( ', ' ),
			'parameterDoc': this.parameters.map( function( p ) {
				return '* @param {Number} ' + p.name + ' - ' + p.description;
			}).join( '\n' ),
		};
		this.fs.copyTpl(
			this.templatePath( 'lib/_accessor.js' ),
			this.destinationPath( 'lib/accessor.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_array.js' ),
			this.destinationPath( 'lib/array.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_deepset.js' ),
			this.destinationPath( 'lib/deepset.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_matrix.js' ),
			'lib/matrix.js',
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_number.js' ),
			this.destinationPath( 'lib/number.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_partial.js' ),
			this.destinationPath( 'lib/partial.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'lib/_typedarray.js' ),
			this.destinationPath( 'lib/typedarray.js' ),
			context
		);

		context[ 'optsParameters' ] = this.parameters.map( function( p ) {
			return '* @param {Number} [opts.' + p.name + '=' + p.default + '] - ' + p.description;
		}).join( '\n' );

		context[ 'optsArguments' ] = this.parameters.map( function( p ) {
			return 'opts.' + p.name;
		}).join( ', ' );

		context[ 'setDefaults' ] = this.parameters.map( function( p ) {
			var optsName = 'opts.' + p.name;
			return optsName + ' = typeof ' + optsName + ' !== \'undefined\' ? ' + optsName + ' : ' + p.default + ';';
		}).join( '\n\t' );

		this.fs.copyTpl(
			this.templatePath('lib/_index.js'),
			this.destinationPath('lib/index.js'),
			context
		);

		context[ 'parameterChecks' ] = this.parameters.map( function( p ) {
			var s = '';
			switch ( p.domain ) {
				case 'Real numbers':
					s += '\tif ( options.hasOwnProperty( \'' + p.name + '\' ) ) {\n';
					s += '\t\topts.' + p.name + ' = options.' + p.name + ';\n';
					s += '\t\tif ( !isNumber( opts.' + p.name + ' ) ) {\n';
					s += '\t\t\treturn new TypeError( \'pdf()::invalid option. `' + p.name + '` parameter must be a number primitive. ';
					s += 'Option: `\' + opts.' + p.name + ' + \'`.\' );\n';
					s += '\t\t}\n';
					s += '\t}';
					parameterModules['isNumber'] = 'isNumber = require( \'validate.io-number-primitive\' ),';
				break;
				case 'Positive real numbers':
					s += '\tif ( options.hasOwnProperty( \'' + p.name + '\' ) ) {\n';
					s += '\t\topts.' + p.name + ' = options.' + p.name + ';\n';
					s += '\t\tif ( !isPositive( opts.' + p.name + ' ) ) {\n';
					s += '\t\t\treturn new TypeError( \'pdf()::invalid option. `' + p.name + '` parameter must be a positive number. ';
					s += 'Option: `\' + opts.' + p.name + ' + \'`.\' );\n';
					s += '\t\t}\n';
					s += '\t}';
					parameterModules['isPositive'] = 'isPositive = require( \'validate.io-positive\' ),';
				break;
				case 'Non-negative integers':
					s += '\tif ( options.hasOwnProperty( \'' + p.name + '\' ) ) {\n';
					s += '\t\topts.' + p.name + ' = options.' + p.name + ';\n';
					s += '\t\tif ( !isNonNegativeInteger( opts.' + p.name + ' ) ) {\n';
					s += '\t\t\treturn new TypeError( \'pdf()::invalid option. `' + p.name + '` parameter must be a non-negative integer. ';
					s += 'Option: `\' + opts.' + p.name + ' + \'`.\' );\n';
					s += '\t\t}\n';
					s += '\t}';
					parameterModules['isNonNegativeInteger'] = 'isNonNegativeInteger = require( \'validate.io-nonnegative-integer\' ),';
				break;
			}
			return s;
		});

		context[ 'optionsParameters' ] = this.parameters.map( function( p ) {
			return '* @param {Number} [options.' + p.name + '=' + p.default + '] - ' + p.description;
		}).join( '\n' );

		context.parameterModules = '';
		for ( var key in parameterModules ) {
		 	if ( parameterModules.hasOwnProperty( key ) ) {
				context.parameterModules += '\n\t';
				context.parameterModules += parameterModules[ key ];
			}
		}

		this.fs.copyTpl(
			this.templatePath('lib/_validate.js'),
			this.destinationPath('lib/validate.js'),
			context
		);

	}, // end METHOD lib()

	/**
	* METHOD: test()
	*	Creates a test boilerplate.
	*/
	test: function() {
		var context = {
				'name': this.moduleName,
				'distribution': this.distribution,
				'parameters': this.parameters
			};

		context[ 'parameterTests' ] = this.parameters.map( function(p) {
			var s = '';
			switch ( p.domain ) {
				case 'Real numbers':
					s += 'it( \'should return an error if provided a non-numeric `' + p.name + '` parameter\', function test() {\n';
					s += '\t\tvar values, err;\n';
					s += '\t\t values = [\n';
					s += '\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
					s += '\t\t];\n\n';
					s += '\t\tfor ( var i = 0; i < values.length; i++ ) {\n';
					s += '\t\t\terr = validate( {}, {\n';
					s += '\t\t\t\t\'' + p.name + '\': values[ i ]\n';
					s += '\t\t\t});\n';
					s += '\t\t\tassert.isTrue( err instanceof TypeError );\n';
					s += '\t\t}\n';
					s += '\t});';
				break;
				case 'Positive real numbers':
					s += 'it( \'should return an error if provided a `' + p.name + '` parameter which is not a positive number\', function test() {\n';
					s += '\t\tvar values, err;\n';
					s += '\t\t values = [\n';
					s += '\t\t\t-2,\n\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
					s += '\t\t];\n\n';
					s += '\t\tfor ( var i = 0; i < values.length; i++ ) {\n';
					s += '\t\t\terr = validate( {}, {\n';
					s += '\t\t\t\t\'' + p.name + '\': values[ i ]\n';
					s += '\t\t\t});\n';
					s += '\t\t\tassert.isTrue( err instanceof TypeError );\n';
					s += '\t\t}\n';
					s += '\t});';
				break;
				case 'Non-negative integers':
					s += 'it( \'should return an error if provided a `' + p.name + '` parameter which is not a non-negative integer\', function test() {\n';
					s += '\t\tvar values, err;\n';
					s += '\t\t values = [\n';
					s += '\t\t\t-2,\n\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
					s += '\t\t];\n\n';
					s += '\t\tfor ( var i = 0; i < values.length; i++ ) {\n';
					s += '\t\t\terr = validate( {}, {\n';
					s += '\t\t\t\t\'' + p.name + '\': values[ i ]\n';
					s += '\t\t\t});\n';
					s += '\t\t\tassert.isTrue( err instanceof TypeError );\n';
					s += '\t\t}\n';
					s += '\t});';
				break;
			}
			return s;
		}).join( '\n' );

		this.fs.copyTpl(
			this.templatePath( 'test/_test.js' ),
			this.destinationPath( 'test/test.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.accessor.js' ),
			this.destinationPath( 'test/test.accessor.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.array.js' ),
			this.destinationPath( 'test/test.array.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.deepset.js' ),
			this.destinationPath( 'test/test.deepset.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.matrix.js' ),
			this.destinationPath( 'test/test.matrix.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.number.js' ),
			this.destinationPath( 'test/test.number.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.partial.js' ),
			this.destinationPath( 'test/test.partial.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.typedarray.js' ),
			this.destinationPath( 'test/test.typedarray.js' ),
			context
		);
		this.fs.copyTpl(
			this.templatePath( 'test/_test.validate.js' ),
			this.destinationPath( 'test/test.validate.js' ),
			context
		);
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
