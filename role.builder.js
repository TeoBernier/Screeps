/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {
    run: function(a_creep) {
        var constructionSite = a_creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
        if(constructionSite)
        {
        	if(a_creep.build(constructionSite)==ERR_NOT_IN_RANGE)
        	{
        		a_creep.moveTo(constructionSite);
        	}
        }

    }
};

module.exports = roleBuilder;
