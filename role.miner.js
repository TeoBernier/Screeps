/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

var roleMiner = {
    run: function(creep) {
        var objToGo = Game.getObjectById(creep.memory.idToGo);
        if ( creep.harvest(objToGo)  == ERR_NOT_IN_RANGE ) {
            creep.moveTo(objToGo);
        }
    }
};
module.exports = roleMiner;
