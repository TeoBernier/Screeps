/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('buildingManager');
 * mod.thing == 'a thing'; // true
 */

var buildingManager = {
    run: function(a_room) {
        var structuresList = a_room.find(FIND_MY_STRUCTURES);
        var constructionSitesList = a_room.fin(FIND_MY_CONSTRUCTION_SITES);
        
        
        
        
    }
};
module.exports = buildingManager;