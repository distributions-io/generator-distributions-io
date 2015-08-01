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
				'default': 'distributions-' + dirname,
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
			},
			{
				'type': 'input',
				'name': 'functionBody',
				'message': 'Implementation',
				'default': 'mu'
			}
		];

		// Prompt the user for responses:
		this.prompt( prompts, function onAnswers( answers ) {
			this.author = answers.author;
			this.email = answers.email;
			this.moduleName = answers.name;
			this.distribution = answers.distribution;
			this.functionBody = answers.functionBody;
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
				type: 'list',
				name: 'parameterDomain',
				message: 'What values can the parameter take?',
				choices: [
					'Real numbers',
					'Positive real numbers',
					'Non-negative real numbers',
					'Non-negative integers',
					'Probability value'
				]
			},
			{
				'type': 'input',
				'name': 'parameterExampleInputs',
				'message': 'What are four example inputs for the parameter (separated by commas)?',
				'validate': function( input ) {
					if ( input.split( ',' ).length === 4 ) {
						return true;
					} else {
						return false;
					}
				}
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
					'domain': answers.parameterDomain,
					'exampleInputs': answers.parameterExampleInputs.split( ',')
				};
				console.log( param )
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
	* METHOD getValidationData()
	*	Prompt user for validation data.
	*/
	getValidationData: function() {
		var next = this.async(),
			i = 0,
			self = this;

		self.expectedArray = [];
		function promptForValidationData() {
			self.prompt( {
					'type': 'input',
					'name': 'expectedData',
					'message': 'What is the expected value when ' + self.parameters.map( function( p ) {
						return p.name + ' = ' +  p.exampleInputs[ i ];
					}).join( ' and ' )
			}, function onAnswers( answer ) {
				self.expectedArray[ i ] = answer.expectedData;
				i++;
				if ( i < 4 ) {
					promptForValidationData();
				} else {
					next();
				}
			});
		}

		promptForValidationData();

	}, // end METHOD getValidationData()

	/**
	* METHOD: mkdirs()
	*	Creates module directories.
	*/
	mkdirs: function() {
		mkdirp( 'benchmark' );
		mkdirp( 'examples' );
		mkdirp( 'lib' );
		mkdirp( 'test' );
		mkdirp( 'test/utils' );
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
			'parameters': this.parameters,
			'functionBody': this.functionBody,
			'x': this.parameters[ 0 ].name,
			'y': this.parameters[ 1 ].name
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

		var context,
			files,
			keys,
			parameterModules = {},
			self = this;

		context = {
			'distribution': this.distribution,
			'parameters': this.parameters,
			'functionBody': this.functionBody,
			'x': this.parameters[ 0 ].name,
			'y': this.parameters[ 1 ].name,
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

		context[ 'parameterChecks' ] = this.parameters.map( function( p, i ) {
			var s = '';
			switch ( p.domain ) {
				case 'Real numbers':
					s += '\tif ( !isNumber( ' + p.name + ' ) ) {\n';
					s += '\t\treturn NaN;\n';
					s += '\t}';
					parameterModules['isNumber'] = 'isNumber = require( \'validate.io-number-primitive\' )';
				break;
				case 'Positive real numbers':
					s += '\tif ( !isPositive( ' + p.name + ' ) ) {\n';
					s += '\t\treturn NaN;\n';
					s += '\t}';
					parameterModules['isPositive'] = 'isPositive = require( \'validate.io-positive-primitive\' )';
				break;
				case 'Non-negative real numbers':
					s += '\tif ( !isNonNegative( ' + p.name + ' ) ) {\n';
					s += '\t\treturn NaN;\n';
					s += '\t}';
					parameterModules['isNonNegative'] = 'isNonNegative = require( \'validate.io-nonnegative\' )';
				break;
				case 'Non-negative integers':
					s += '\tif ( !isNonNegativeInteger( ' + p.name + ' ) ) {\n';
					s += '\t\treturn NaN;\n';
					s += '\t}';
					parameterModules['isNonNegativeInteger'] = 'isNonNegativeInteger = require( \'validate.io-nonnegative-integer\' )';
				break;
				case 'Probability value':
					s += '\tif ( !( isNumber(' + p.name + ' && 0 <= ' + p.name + ' && ' + p.name + ' <= 1) ) {\n';
					s += '\t\treturn NaN;\n';
					s += '\t}';
					parameterModules['isNumber'] = 'isNumber = require( \'validate.io-number-primitive\' )';
				break;
			}
			return s;
		});

		context['parameterModules'] = '';
		keys = Object.keys( parameterModules );
		keys.forEach( function( k, i ) {
			if ( i === 0 ) {
				context['parameterModules'] += 'var ';
			}
			context['parameterModules'] += parameterModules[ k ];
			if ( i + 1 !== keys.length ) {
				context['parameterModules'] += ',\n\t';
			} else {
				context['parameterModules'] += ';';
			}
		});

		files = [
			'lib/_accessor.js',
			'lib/_array-array.js',
			'lib/_array-number.js',
			'lib/_array-typedarray.js',
			'lib/_fcns.js',
			'lib/_getType.js',
			'lib/_index.js',
			'lib/_matrix-matrix.js',
			'lib/_matrix-number.js',
			'lib/_nans.js',
			'lib/_number-array.js',
			'lib/_number-matrix.js',
			'lib/_number-number.js',
			'lib/_number-typedarray.js',
			'lib/_typedarray-array.js',
			'lib/_typedarray-number.js',
			'lib/_typedarray-typedarray.js',
			'lib/_validate.js'
		];
		files.forEach( function( file ) {
			self.fs.copyTpl(
				self.templatePath( file ),
				self.destinationPath( file.replace( '_', '' ) ),
				context
			);
		});

	}, // end METHOD lib()

	/**
	* METHOD: test()
	*	Creates a test boilerplate.
	*/
	test: function() {
		var context = {
				'name': this.moduleName,
				'distribution': this.distribution,
				'parameters': this.parameters,
				'x': this.parameters[ 0 ].name,
				'y': this.parameters[ 1 ].name,
				'xArray': this.parameters[ 0 ].exampleInputs,
				'yArray': this.parameters[ 1 ].exampleInputs,
				'expectedArray': this.expectedArray
			},
			files,
			self = this;

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
					s += '\t\t\t-2,\n\t\t\t0,\n\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
					s += '\t\t];\n\n';
					s += '\t\tfor ( var i = 0; i < values.length; i++ ) {\n';
					s += '\t\t\terr = validate( {}, {\n';
					s += '\t\t\t\t\'' + p.name + '\': values[ i ]\n';
					s += '\t\t\t});\n';
					s += '\t\t\tassert.isTrue( err instanceof TypeError );\n';
					s += '\t\t}\n';
					s += '\t});';
				break;
				case 'Non-negative real numbers':
					s += 'it( \'should return an error if provided a `' + p.name + '` parameter which is not a non-negative number\', function test() {\n';
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
					s += '\t\t\t-2,\n\t\t\t2.5,\n\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
					s += '\t\t];\n\n';
					s += '\t\tfor ( var i = 0; i < values.length; i++ ) {\n';
					s += '\t\t\terr = validate( {}, {\n';
					s += '\t\t\t\t\'' + p.name + '\': values[ i ]\n';
					s += '\t\t\t});\n';
					s += '\t\t\tassert.isTrue( err instanceof TypeError );\n';
					s += '\t\t}\n';
					s += '\t});';
				break;
				case 'Probability value':
					s += 'it( \'should return an error if provided a `' + p.name + '` parameter which is not a probability ( = number in [0,1])\', function test() {\n';
					s += '\t\tvar values, err;\n';
					s += '\t\t values = [\n';
					s += '\t\t\t-2,\n\t\t\t2.5,\n\t\t\t\'5\',\n\t\t\t[],\n\t\t\ttrue,\n\t\t\tundefined,\n\t\t\tnull,\n\t\t\tNaN,\n\t\t\tfunction(){},\n\t\t\t{}\n';
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

		// JavaScript files
		files = [
			'test/_test.accessor.js',
			'test/_test.array-array.js',
			'test/_test.array-number.js',
			'test/_test.array-typedarray.js',
			'test/_test.fcns.js',
			'test/_test.getType.js',
			'test/_test.js',
			'test/_test.matrix-matrix.js',
			'test/_test.matrix-number.js',
			'test/_test.nans.js',
			'test/_test.number-array.js',
			'test/_test.number-matrix.js',
			'test/_test.number-number.js',
			'test/_test.number-typedarray.js',
			'test/_test.typedarray-array.js',
			'test/_test.typedarray-number.js',
			'test/_test.typedarray-typedarray.js',
			'test/_test.validate.js'
		];
		files.forEach( function( file ) {
			self.fs.copyTpl(
				self.templatePath( file ),
				self.destinationPath( file.replace( '_', '' ) ),
				context
			);
		});
	}, // end METHOD test()

	/**
	* METHOD: utils())
	*	Copies test utilities.
	*
	*/
	utils: function() {
		this.copy( 'test/utils/_deepcloseto.js', 'test/utils/deepcloseto.js' );
	}, // end METHOD utils()

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
