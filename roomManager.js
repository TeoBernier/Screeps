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
        var miner = 0;
        var truck = 0;
        var upgrader = 0;

        for ( var a_creep in a_room.find(FIND_CREEPS)) {
            if (a_creep.name[0] == 'M') {
                minerRole.run(a_creep);
                miner++;
            } else if (a_creep.name[0] == 'T') {
                truckRole.run(a_creep);
                truck++;
            } else if (a_creep.name[0] == 'U') {
                upgraderRole.run(a_creep);
                upgrader++;
            }
        }

        spawnManager.run(a_room, [miner, truck, upgrader])


    }
};
module.exports = roomManager;
