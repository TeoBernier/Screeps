/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

var roleMiner = {
    run: function(a_creep) {
        if(!Game.flags[a_creep.name[1] + "_" + a_creep.room.name]){
            a_creep.room.memory.isSet = 0;
            return;
        } else if( a_creep.pos.isEqualTo(Game.flags[a_creep.name[1] + "_" + a_creep.room.name].pos) ) {
            a_creep.harvest(a_creep.pos.findInRange(FIND_SOURCES, 1)[0]);
        } else {
            a_creep.moveTo(Game.flags[a_creep.name[1] + "_" + a_creep.room.name].pos);
        }
    }
};
module.exports = roleMiner;
