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
        if ( a_creep.memory.idConstruct == 0 ) {
            var bestConstructionSite = a_creep.pos.findClosestByPath(a_creep.room.find(FIND_MY_CONSTRUCTION_SITES));
           if(bestConstructionSite) {
               a_creep.memory.idConstruct = bestConstructionSite.id;
           } else {
               a_creep.memory.idConstruct = 0;
           }   
        } else {
            var building = Game.getObjectById(a_creep.memory.idConstruct);
            if(!building) {
                var bestConstructionSite = a_creep.pos.findClosestByPath(a_creep.room.find(FIND_MY_CONSTRUCTION_SITES));
                if(bestConstructionSite) {
                    a_creep.memory.idConstruct = bestConstructionSite.id;
                    return;
                } else {
                    a_creep.memory.idConstruct = 0;
                }
            }
            var energyDropped = a_creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            for ( var a_stack in energyDropped ) {
                a_creep.pickup(energyDropped[a_stack]);
            }
            if ( a_creep.build(building) == ERR_NOT_IN_RANGE ) {
                a_creep.moveTo(building);
            } 
        }
    }
};

module.exports = roleBuilder;
