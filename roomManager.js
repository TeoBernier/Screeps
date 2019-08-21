/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roomManager');
 * mod.thing == 'a thing'; // true
 */

var spawnManager = require('spawnManager');
var minerRole = require('role.miner');
var truckRole = require('role.truck');
var upgraderRole = require('role.upgrader');

var roomManager = {
    run: function(a_room) {
        //if(a_room.memory.isSet == 1) {
            var miner = 0;
            var truck = 0;
            var upgrader = 0;
            var builder = 0;
            var creepsList = a_room.find(FIND_MY_CREEPS)
            for ( var a_creep in creepsList) {
                if (creepsList[a_creep].name[0] == 'M') {
                    minerRole.run(creepsList[a_creep]);
                    miner++;
                } else if (creepsList[a_creep].name[0] == 'T') {
                    truckRole.run(creepsList[a_creep]);
                    truck++;
                } else if (creepsList[a_creep].name[0] == 'U') {
                    upgraderRole.run(creepsList[a_creep]);
                    upgrader++;
                } else if (creepsList[a_creep].name[0] == 'U') {
                    builderRole.run(creepsList[a_creep]);
                    builder++;
                }
            }
            spawnManager.run(a_room, [miner, truck, upgrader])
        /*} else {
            a_room.memory.isSet == 1;
            
        }*/


    }
};
module.exports = roomManager;
