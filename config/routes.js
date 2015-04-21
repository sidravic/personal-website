var HomeController = require('./../controllers/home_controller.js');
var StatsController = require('./../controllers/stats_controller.js');
var staticHandler = {
    handler: {
        directory: {
            path: 'public/javascripts'
        }
    }
}


module.exports = [
    { path: '/stats', method: 'GET', config: StatsController.index },
    { path: '/', method: 'GET', config: HomeController.index},
    { path: '/static/javascripts/{filename}', method: 'GET', config: staticHandler}
]



