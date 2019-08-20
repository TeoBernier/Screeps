/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {
    run: function(creep) {
        if ( creep.pos.inRangeTo(creep.room.controller, 2)) {
            var energyDropped = creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_RESOURCES));
            if ( creep.pos.inRangeTo(energyDropped, 3) ) {
                if ( creep.pickup(energyDropped) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(energyDropped);
                }
            }
        } else {
          creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleUpgrader;
