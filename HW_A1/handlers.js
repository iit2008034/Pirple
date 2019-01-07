/*
 * Route Handlers defined
 */

//Container for all handlers
var handlers = {};

// handler for route : hello 
handlers.hello = function (data, callback){
	callback(200,{'Message':'Welcome to My First Assignment'});
};

//handler for route other than hello 
handlers.notFound = function(data, callback){
	callback(404);
};




// Export the module
module.exports = handlers;