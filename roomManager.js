/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roomManager');
 * mod.thing == 'a thing'; // true
 */

var toolsManager = require('toolsManager');
var spawnManager = require('spawnManager');
var minerRole = require('role.miner');
var truckRole = require('role.truck');
var upgraderRole = require('role.upgrader');

var roomManager = {
    run: function(a_room) {
        if(a_room.memory.isSet == 1) {
            
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
        } else {
            a_room.memory.isSet = 1;
            var sourcesList = a_room.find(FIND_SOURCES);
            for ( var a_source in sourcesList ) {
                var positionsListFree = toolsManager.positionFreeNear(sourcesList[a_source].pos, a_room, 1);
                var bestPlaceToMine = a_room.controller.pos.findClosestByPath(positionsListFree);
                a_room.createFlag( bestPlaceToMine, "" + a_source + "_" + a_room.name + "", COLOR_YELLOW, COLOR_CYAN);
            }
            var positionsListFree = toolsManager.positionFreeNear(a_room.controller.pos, a_room, 2);
            var bestPlaceToUpgrade = a_room.find(FIND_MY_SPAWNS)[0].pos.findClosestByPath(positionsListFree);
            a_room.createFlag( bestPlaceToUpgrade, "U" + "_" + a_room.name + "", COLOR_YELLOW, COLOR_RED);
            
        }


    }
};
module.exports = roomManager;
