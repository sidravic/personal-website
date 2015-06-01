var currentMembers = 0;


var currentMembersService = {
    getMembers: function(){
        return currentMembers;
    },

    incrementMembers: function(cb){
        currentMembers += 1;

        if(cb)
            cb(this.getMembers());
    },

    decrementMembers: function(cb){
        if (currentMembers == 0)
            return ;
        else
            currentMembers -= 1;

        if(cb)
            cb(this.getMembers());
    }
}

module.exports = currentMembersService;