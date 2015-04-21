var async = require('async')
var viewCounterService = require('./../services/views_counter_service.js');

module.exports.index = {
    description: 'Displays Stats',
    auth: 'simple',
    handler: function(request, reply){
        async.parallel({
            totalViews: function(callback){
                viewCounterService.getTotalViews(function(err, _totalViews){
                   callback(err,_totalViews)
                })
            },
            lastViewedAt: function(callback){
                viewCounterService.getLastViewedAt(function(err, _lastViewedAt){
                    callback(err, _lastViewedAt)
                })
            },
            lastViewedIp: function(callback){
                viewCounterService.getLastViewedIp(function(err, _lastViewedIp){
                    callback(err, _lastViewedIp);
                })
            },
            viewedIps: function(callback){
                viewCounterService.getViewedIps(function(err, _viewedIps){
                    callback(err, _viewedIps);
                })
            }
        }, function(err, results){
            var totalViews = results.totalViews;
            var lastViewedIp = results.lastViewedIp;
            var lastViewedAt = results.lastViewedAt;
            var viewedIps = results.viewedIps;
            reply.view('stats/index', {title: 'Stats',
                totalViews: totalViews,
                lastViewedIp: lastViewedIp,
                lastViewedAt: lastViewedAt,
                viewedIps: viewedIps
            })
        })

    }
}



