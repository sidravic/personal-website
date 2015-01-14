var Hoek = require('hoek');

module.exports.addHelper = function(helpers){

    helpers.applicationHelper = {
        urlAndBodyParams: function(request){
            var queryParams = request.url.query;
            var bodyParams = request.params.data;

            var allParams = {}
            allParams = Hoek.merge(allParams, queryParams);
            allParams = Hoek.merge(allParams, bodyParams);
            return allParams
        }
    }

    return helpers;
}