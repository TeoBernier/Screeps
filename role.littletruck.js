/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.truck');
 * mod.thing == 'a thing'; // true
 */

var roleLittleTruck = {
    run: function(a_creep) {
        if(!Game.flags[a_creep.name[1] + "_" + a_creep.room.name] || !Game.flags["U_" + a_creep.room.name]) {
            a_creep.room.memory.isSet = 0;
            return;
        }
        var flag = Game.flags[a_creep.name[1] + "_" + a_creep.room.name];
        if(a_creep.carry[RESOURCE_ENERGY] == 0) {
            if( a_creep.pos.isNearTo(flag.pos) ){
                a_creep.pickup(flag.pos.findInRange(FIND_DROPPED_RESOURCES, 0)[0]);
            } else {
                a_creep.moveTo(flag.pos);   
            }
        } else {
            var containers = a_creep.room.find(FIND_STRUCTURES, {
                    filter: (a_structure) => {
                        return (a_structure.structureType == STRUCTURE_EXTENSION ||
                                a_structure.structureType == STRUCTURE_SPAWN ||
                                a_structure.structureType == STRUCTURE_CONTAINER ||
                                (a_structure.structureType == STRUCTURE_TOWER && a_structure.energy < a_structure.energyCapacity / 2) ||
                                a_structure.structureType == STRUCTURE_CONTAINER) && (a_structure.energy < a_structure.energyCapacity) && ((!a_structure.owner) || a_structure.my);
                    }
            });
            if ( containers.length > 0) {
                containers = a_creep.pos.findClosestByPath(containers);
                if( a_creep.transfer(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    a_creep.moveTo(containers);
                }
            } else {
                var builder = Game.creeps["B_" + a_creep.room.name];
                if(builder && builder.memory.idConstruct != 0 ) {
                    if( a_creep.transfer(builder, RESOURCE_ENERGY, 0) == ERR_NOT_IN_RANGE) {
                        a_creep.moveTo(builder);
                    } else {
                        a_creep.drop(RESOURCE_ENERGY);
                    }
                } else {
                    var flag_carry = Game.flags["U_" + a_creep.room.name];
                    if ( a_creep.pos.isEqualTo(flag_carry.pos) ) {
                        a_creep.drop(RESOURCE_ENERGY);
                    } else {
                        a_creep.moveTo(flag_carry.pos);
                    }
                }
            }
        }
    }
};

module.exports = roleLittleTruck;
