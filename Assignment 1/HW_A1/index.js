/*
 * Primary File for the API
 */

// Depedencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var handlers = require('./handlers');
var fs = require('fs');

// The server should respond to all the requests  with a string
var httpServer = http.createServer( function (req, res){
	unifiedServer(req, res);
});

// Start the http server, and have it listen on Configured port in config.js
httpServer.listen(config.httpPort,function(){
	console.log("The server is listening on "+config.httpPort+" port in "+config.envName+" mode" );
});


// Load SSL certificate and Key file for https support
var httpsServerOptions = {
	'key' : fs.readFileSync('./https/key.pem'),
	'cert' : fs.readFileSync('./https/cert.pem')
};

// The server should respond to all the requests with a string
var httpsServer = https.createServer(httpsServerOptions, function (req, res){
	unifiedServer(req, res);
});

// Start the https server, and have it listen on Configured port in config.js
httpsServer.listen(config.httpsPort,function(){
	console.log("The server is listening on "+config.httpsPort+" port in "+config.envName+" mode" );

});


// All the server logic 
var unifiedServer = function(req, res){

	// Get the URL and parse it
	var parsedUrl = url.parse(req.url, true);

	// Get the path from uRL
	var path = parsedUrl.pathname;
	var trimmedpath = path.replace(/^\/+|\/+$/g,'');

	// Get the query String as an object
	var queryStringObject = parsedUrl.query;

	// Get the http method
	var method = req.method.toLowerCase();

	// Get the header as an Object
	var headers = req.headers;

	// Get the payload, if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data', function(data){
		buffer += decoder.write(data);
	});
	req.on('end', function(){
		buffer += decoder.end();

		// choose the handler this request should go to
		// If Request not found, should go to notFound handler.
		var chosenhandler = typeof(router[trimmedpath]) !== 'undefined'? router[trimmedpath] : handlers.notFound;

		//construct DataObject to send to handlers
		var data = {
			'trimmedpath' : trimmedpath,
			'queryStringObject' : queryStringObject,
			'method' : method,
			'headers' : headers,
			'payload' : buffer
		}

		// Route the handler to specified handler in the router
		chosenhandler(data, function(statusCode, payload){
			// use the status code callback by the handler ot default to 200.
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
			// use the payload called by handler, or
			payload = typeof(payload) == 'object' ? payload : {} ;

			// Conver the payload in to a string
			var payloadString  = JSON.stringify(payload);

			// return the response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the request path
			console.log("Request recieved on this path:"+trimmedpath 
				+" with this method:"+ method 
				+"\nand with these query String parameters:" , queryStringObject
				,"\nheaders:", headers
				, "\npayLoad:", buffer);

			console.log("Returning the response" , statusCode, payloadString);
		});
	});
};


// Define a request router
var router = {
	'hello' : handlers.hello,
};