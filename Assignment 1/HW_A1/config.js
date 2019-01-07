/*
 * Create and Export Configuration variables
 */

// Contaniner for all the environments
var environments = {};

// Staging environment
environments.staging = {
	'httpPort': 3000,
	'httpsPort': 3001,
	'envName' : 'staging'
};

// Production environment
environments.production = {
	'httpPort': 5000,
	'httpsPort': 5001,
	'envName' : 'production'
};

// determine which environment was passed a command-
var currentEnvironment  = typeof(process.env.NODE_ENV) == 'String' ? process.env.NODE_ENV.toLowerCase() : '';

//check the current environment is one of the environments above,
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;