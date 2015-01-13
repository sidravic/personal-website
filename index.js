var Hapi = require('hapi');
var Path = require('path');


var server = new Hapi.Server({ debug: { request: ['error', 'received'] } });

server.connection({port: 8000});


var controllers = require('./controllers').attachHandlers(server)


server.start(function(){
	console.log("Server running...")
})