module.exports.add = function(server){

	var index = function(request, response){
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

	server.route({
		method: 'GET',
		path: '/',
		handler: index
	})


}





