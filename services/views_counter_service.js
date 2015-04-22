var _ = require('underscore');
var Promise = require('promise');
var redis = require('./../config/databaseConnection.js');
var totalViews = 0;
var lastViewedAt = null;
var lastViewedIp = null;
var viewedIps = [];
var viewedToday = 0;

redis.get('totalViews', function(err, value){
    totalViews = value;
})

redis.get('lastViewedAt', function(err, value){
    lastViewedAt = value;
})

redis.smembers('viewedIps', function(err, _viewedIps){
    viewedIps = _viewedIps;
});

redis.get('lastViewedIp', function(err, _lastViewedIp){
    lastViewedIp = _lastViewedIp;
})


var viewsCounterService = {
    increment: function(){
        //totalViews += 1;
        redis.incr('totalViews', function(err, incrStatus){
            if(err){
                throw err;
            }
        })
    },

    incrementCountForDay: function(keyForToday){
        var self = this;
        redis.incr(keyForToday, function(err, incrStatus){
            if(err) throw err;
            self.updateExpiryForKey(keyForToday);
        })
    },

    getCountForViewsToday: function(keyForToday, cb){
        redis.get(keyForToday, function(err, _viewsForToday){
            if(err) cb(err, null);

            cb(null, _viewsForToday);
        })
    },

    getTotalViews: function(cb){
        //return new Promise(function(resolve, reject){
        //  redis.get('totalViews', function(err, _totalViews){
        //     if (err) reject(err)
        //     else{
        //         resolve(_totalViews);
        //     }
        //  });
        //})
        redis.get('totalViews', function(err, _totalViews){
            if(err) cb(err, null);

            cb(null, _totalViews);
        })

    },

    getViewedIps: function(cb){
        redis.smembers('viewedIps', function(err, _viewedIps){
            if(err) cb(err, null);
            cb(null, _viewedIps);
        })

    },

    getLastViewedIp: function(cb){
        redis.get('lastViewedIp', function(err, _lastViewedIp){
            if(err) cb(err, null);
            cb(null, _lastViewedIp);
        })

    },

    getLastViewedAt: function(cb){
        redis.get('lastViewedAt', function(err, _lastViewedAt){
            if (err) cb(err, null);
            cb(null, _lastViewedAt);
        })

    },

    updateLastViewedAt: function(){
        lastViewedAt = new Date();
        redis.set('lastViewedAt', lastViewedAt, function(err, setStatus){
            if(err) throw err;
            return setStatus;

        })
    },

    updateLastViewedIp: function(requestIp){
        var lastViewedIp = requestIp;
        redis.set('updateLastViewedIp', lastViewedIp, function(err, setStatus){
            if(err) throw err;
            return setStatus;
        })
    },

    updateViewedIps: function(requestIp){
        //viewedIps.push(requestIp);
        //viewedIps = _.uniq(viewedIps);
        redis.sadd('viewedIps', requestIp, function(err, addStatus){
           if (err) throw err;
            return addStatus;
        });
    },

    updateExpiryForKey: function(key){
        var timeInSeconds = 24 * 60 * 60;
        redis.expire(key, timeInSeconds, function(err, expireStatus){
            if (err) throw err;

        })
    }


}

module.exports = viewsCounterService;