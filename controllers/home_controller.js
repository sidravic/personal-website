var Path = require('path')
var helpers = helpers || {};
var util = require('util')
helpers = require(Path.join(__dirname, './../helpers/home_helper.js')).addHelper(helpers)
var StatsService = require('./../services/stats_service.js');

module.exports.index = {
	description: 'Home page',
	state: {parse: true, 'failAction': 'log'},
	handler: function(request, response){
		request.log(['params'], helpers.applicationHelper.urlAndBodyParams(request));
		var cookieKey = StatsService.generateCookieForHour();
		var requestIp = request.headers['x-real-ip'] || request.headers['x-forwarded-for'] || request.info.remoteAddress;
		StatsService.cookieExists(request.state, cookieKey,
			                      requestIp,
			                     StatsService.incrementViews);

		util.inspect(request.state);
		response.view('home/index', {'currently': {company: 'Idyllic',
				                                   company_url: 'http://idyllic-software.com',
				                                   doing: ['Ruby', 'Node']},
				                                   'blog': 'http://siddharth-ravichandran.com',
				                                   'twitter_handle': '@super_sid',
				  								   'twitter_url': 'http://twitter.com/super_sid',
													'title': 'Siddharth Ravichandran',
													'linkedin_url': 'http://in.linkedin.com/in/siddharthravichandran'
		}).state(cookieKey, new Date().toString(), {isSecure: false, encoding: 'base64json'});

	}
}







