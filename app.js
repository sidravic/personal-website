var Hapi = require('hapi');
var Path = require('path');
//var sequelize = require('./config/databaseConnection.js');
var bcrypt = require('bcrypt')
var Basic = require('hapi-auth-basic');
var Website = require('./config');
var util = require('util');
var websocketServer = require('./websocket_server');

if (typeof(PhusionPassenger) != 'undefined') {
	PhusionPassenger.configure({ autoInstall: false });
}
//{ debug: { request: ['error', 'received'] } }
if (typeof(PhusionPassenger) != 'undefined') {
	// Requires Phusion Passenger >= 4.0.52!
	server = new Hapi.Server();
	server.connection({port: '/passenger'})
} else {
	server = new Hapi.Server({debug: {log: ['request', 'error', 'debug'],
							  request: ['error', 'received']}});
	server.connection({port: 8081});
}

//var server = new Hapi.Server({debug: {log: ['request', 'error', 'debug'],
//							  request: ['error', 'received']}});

if (process.env.ENVIRONMENT == undefined)
	process.env.ENVIRONMENT = "development";

//server.connection({port: 8000});
server.connection({ routes: { state: { parse: true } } });

server.state('session', {
	ttl: 48 * 60 * 60 * 1000,     // One day
	isSecure: false,
	path: '/',
	encoding: 'none'
});

server.on('request-internal', function (request, event, tags) {

	if (tags.error && tags.state) {
		console.log('-------------------------')
		console.error(event);
		console.log('-------------------------')
	}
});

var validAuthLogin = {
	username: 'supersid',
	password: '$2a$10$P.r4e119FJQwwssQeKildeJ5inkl7ofHzaC4nB95olPeXmhq0Oqpy'
}

var validate = function(username, password, callback){
	if(username != validAuthLogin.username)
		return callback("invalid username or password", false);

	var authStatus = bcrypt.compareSync(password, validAuthLogin.password)
	if (!authStatus){
		return callback("invalid username or password", false);
	}

	return callback(null, true, {});
}

server.register(Basic, function(err){
	if(err) throw err;
	server.auth.strategy('simple', 'basic', {validateFunc: validate})
});

server.register([{
	register: Website,
	options: {}
}], function(err) {
	if (err)
	    throw err;
})





server.on('request', function(request, event, data){
	console.log("[Info]:" + new Date() +
	"\nEvent:" + event.tags+
	"\nData:" + util.inspect(data) );
})

server.views({
	engines:  {
		html: require('ejs')
	},
	path: Path.join(__dirname, './templates'),
	layoutPath: Path.join(__dirname, './templates/layouts'),
	layout: 'application'
})



server.start(function(){
	console.log("Server running...")
	websocketServer.installHandlers(server.listener, {prefix: '/echo'})
})