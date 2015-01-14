module.exports.addHelper = function(helpers){
    if (helpers.applicationHelper == undefined){
        require('./application_helper').addHelper(helpers)
    }
    helpers.homeHelper = {}

    return helpers;
}
