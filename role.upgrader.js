/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {
    run: function(a_creep) {
        var flag = Game.flags["U_" + a_creep.room.name];
        if ( a_creep.pos.isEqualTo(flag.pos) ) a_creep.moveTo(a_creep.room.controller);
        else if ( a_creep.pos.inRangeTo(a_creep.room.controller, 2)) {
            if ( a_creep.carry[RESOURCE_ENERGY] > 0 ) {
                if( a_creep.upgradeController(a_creep.room.controller) == ERR_NOT_IN_RANGE) {
                    a_creep.moveTo(a_creep.room.controller);
                }
            }
            var energyDropped = a_creep.pos.findClosestByPath(a_creep.room.find(FIND_DROPPED_RESOURCES));
        
            if ( energyDropped && a_creep.pos.inRangeTo(energyDropped, 3) ) {
                if ( a_creep.pickup(energyDropped) == ERR_NOT_IN_RANGE ) {
                    a_creep.moveTo(energyDropped);
                }
            }
        } else {
            a_creep.moveTo(flag.pos);
        }
    }
};

module.exports = roleUpgrader;
