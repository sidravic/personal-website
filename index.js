var Hapi = require('hapi');
var Path = require('path');


//{ debug: { request: ['error', 'received'] } }
var server = new Hapi.Server({debug: {log: ['request', 'error', 'debug'],
									  request: ['error', 'received']}});

server.connection({port: 8000});

var controllers = require('./controllers').attachHandlers(server)



server.start(function(){
	console.log("Server running...")
})