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
    run: function(Room) {
        var miner = 0;
        var truck = 0;
        var upgrader = 0;

        for ( var creep in Room.find(FIND_CREEPS)) {
            if (creep.name[0] == 'M') {
                minerRole.run(creep);
                miner++;
            } else if (creep.name[0] == 'T') {
                truckRole.run(creep);
                truck++;
            } else if (creep.name[0] == 'U') {
                upgraderRole.run(creep);
                upgrader++;
            }
        }

        spawnManager.run(Room, [miner, truck, upgrader])


    }
};
module.exports = roomManager;
