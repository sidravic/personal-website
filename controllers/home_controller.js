var Path = require('path')
var helpers = helpers || {};
var util = require('util')
helpers = require(Path.join(__dirname, './../helpers/home_helper.js')).addHelper(helpers)

module.exports.add = function(server){

	var index = function(request, response){
		request.log(['params'], helpers.applicationHelper.urlAndBodyParams(request));
		response.view('home/index', {'currently': {company: 'Idyllic',
			                                       company_url: 'http://idyllic-software.com',
			                                       doing: ['Ruby', 'Node']},
									 'blog': 'http://siddharth-ravichandran.com',
			                         'twitter_handle': '@super_sid',
									 'twitter_url': 'http://twitter.com/super_sid',
			                         'title': 'Siddharth Ravichandran',
			 						 'linkedin_url': 'http://in.linkedin.com/in/siddharthravichandran'
									})

	}

	server.on('request', function(request, event, data){
		console.log("[Info]:" + new Date() +
					"\nEvent:" + event.tags+
					"\nData:" + util.inspect(data) );
	})


	server.route({
		method: 'GET',
		path: '/',
		handler: index
	})
}





