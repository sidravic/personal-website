var Path = require('path');
module.exports.attachHandlers = function(server){
	server.views({
		engines:  {
			html: require('ejs')
		},
		path: Path.join(__dirname, './../templates'),
		layoutPath: Path.join(__dirname, './../templates/layouts'),
		layout: 'application'
	})

	server.route({
		method: 'GET',
		path: '/static/{filename*2}',
		handler: {
			directory: {
				path: 'public',
				listing: false,
				index: false
			}
		}
	})



	require('./home_controller').add(server)
	require('./pages_controller').add(server)
}