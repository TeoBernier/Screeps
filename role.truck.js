/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.truck');
 * mod.thing == 'a thing'; // true
 */

var roleTruck = {
    run: function(creep) {
        var objToGo = Game.getObjectById(creep.memory.idToGo);

        if(creep.carry[RESOURCE_ENERGY] == 0) {
            if ( creep.pos.inRangeTo(objToGo, 3) ) {
                var energyDropped = creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_RESOURCES));
                if ( creep.pickup(energyDropped) == ERR_NOT_IN_RANGE) creep.moveTo(energyDropped);
            } else {
                creep.moveTo(objToGo);
            }
        } else {
            var containers = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity ;
                    }
            });
            if ( containers.length > 0) {
                containers = creep.pos.findClosestByPath(containers);
                if(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers);
                }
            } else {
                if ( creep.pos.inRangeTo(creep.room.controller, 2) ) {
                    creep.drop(RESOURCE_ENERGY, creep.carry(RESOURCE_ENERGY));
                } else {
                    creep.moveTo(creep.room.controller);
                }
            }
        }



    }
};

module.exports = roleTruck;
