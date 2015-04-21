var util = require('util')
var viewsCounterService = require('./views_counter_service.js');

var StatsService = {

    cookieBaseKey: function(){
        return "_sidPW_"
    },

    cookieExists: function(state, cookieKey, remoteAddress, callback){
        if(state[cookieKey] == undefined){
            callback(true, state, remoteAddress);
        }else {
            callback(false, null, null);
        }
    },

    generateCookieForHour: function(){
        var date = new Date();
        var cookieKey = StatsService.cookieBaseKey().toString() +
                        "_" + date.getDate().toString() + "_" + date.getMonth().toString() +
                        "_"  + date.getFullYear().toString() +
                        "_"  + date.getHours().toString() ;

        return cookieKey;
    },

    incrementViews: function(shouldIncrement, cookieKey, remoteAddress){
        if (shouldIncrement) {
            viewsCounterService.increment();
            viewsCounterService.updateLastViewedAt();
            viewsCounterService.updateLastViewedIp(remoteAddress);
            viewsCounterService.updateViewedIps(remoteAddress)
        }
    }
}

module.exports = StatsService;