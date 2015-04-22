//var Sequelize = require('sequelize');
//
//if (process.env.ENVIRONMENT == 'production') {
//    var databaseName = 'hapi_personal_website_production';
//    var userName = process.env.DB_USERNAME;
//    var password = process.env.DB_PASSWORD;
//}else{
//    var databaseName = 'hapi_personal_website_development';
//    var userName = 'siddharthravichandran';
//    var password = '';
//}
//
//
//
//
//var connectionParams = {
//    host: 'localhost',
//    dialect: 'postgres',
//    pool: {
//        max: 5,
//        min: 0,
//        idle: 10000
//    }
//}
//var sequelize = new Sequelize(databaseName, userName, password, connectionParams);
//module.exports = sequelize;

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err){
    throw err;
})

module.exports = client

client.exists('totalViews', function(err, existsStatus){
    if(existsStatus == 0){
        client.set('totalViews', 0, redis.print);
    }
})

client.exists('lastViewedAt', function(err, existsStatus){

});

client.exists('lastViewedIp', function(err, existsStatus){
     if(existsStatus == 0){
         client.set('lastViewedIp', '');
     }
})



