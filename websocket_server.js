

var _ = require('underscore')
var sockjs = require('sockjs');
var socketServer = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'});
var util = require('util');
var currentMembersService = require('./services/current_members_service');
var allConnections = [];

var publish = function(memberCount){
    _.forEach(allConnections, function(connection){
        console.log(memberCount);
        connection.write(JSON.stringify({membersCount: memberCount}));
    })

    console.log('temp');
}


socketServer.on('connection', function (conn) {
    console.log("New connection arrived");
    console.log("Inspecting Connection");
    util.inspect(conn);
    allConnections.push(conn);

    currentMembersService.incrementMembers(function(count){
        publish(count);
    });

    conn.on('data', function (data) {
        console.log(data);
    })

    conn.on('close', function () {
        console.log('Connection Closed');
        currentMembersService.decrementMembers(function(count){
            publish(count);
        });


    })
});





module.exports = socketServer;