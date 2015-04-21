var _ = require('underscore');
var Promise = require('promise');
var redis = require('./../config/databaseConnection.js');
var totalViews = 0;
var lastViewedAt = null;
var lastViewedIp = null;
var viewedIps = [];

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
        lastViewedIp = requestIp;
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
    }


}

module.exports = viewsCounterService;