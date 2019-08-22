/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.tower');
 * mod.thing == 'a thing'; // true
 */

var towerManager = {
    run: function(a_tower) {
        var hostiles = a_tower.room.find(FIND_HOSTILE_CREEPS);
        if( hostiles.length > 0 ) {
            hostiles = a_tower.pos.findClosestByRange(hostiles);
            a_tower.attack(hostiles);
        } else {
            var alliesDamaged = a_tower.room.find(FIND_MY_CREEPS, {
                filter: (a_creep) => {
                    return a_creep.hits < a_creep.hitsMax;
                }});
            if( alliesDamaged.length > 0 ) {
                alliesDamaged = a_tower.pos.findClosestByRange(alliesDamaged);
                a_tower.heal(alliesDamaged);
            } else {
            var structuresDamaged = a_tower.room.find(FIND_STRUCTURES, {
                filter: (a_structure) => {
                    return (a_structure.hits < a_structure.hitsMax) && ((!a_structure.owner) || a_structure.my);
                }});
                if( structuresDamaged.length > 0 ) {
                    structuresDamaged = a_tower.pos.findClosestByRange(structuresDamaged);
                    a_tower.repair(structuresDamaged);
                }
            }
        }
        
    }        
}

module.exports = towerManager;