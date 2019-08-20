/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnManager');
 * mod.thing == 'a thing'; // true
 */

var toolsManager = require('toolsManager');

var spawnManager = {
    run: function(Room, NBrole) {
        var sources = Room.find(FIND_SOURCES);
        var creeps = Room.find(FIND_MY_CREEPS);
        var spawns = Room.find(FIND_MY_SPAWNS);
        //---------------------------------------- CHECK DES MINEURS ------------------------------------
        if (NBrole[0] < sources.length) {
            var tab = new Array(int[sources.length]).fill(0);
            for ( var creep in creeps ) {
                if ( creep.name[0] == 'M' ) tab[ creep.name[1] ] == 1;
            }
            for ( var i = 0 ; i < sources.length ; i++ ) {
                if(!tab[i]) {
                    for ( var spawn in spawns ) {
                        if ( spawn.spawnCreep(toolsManager.modulesNeeded("miner", Room.energyAvailable, 2), "M" + i + " " + Room.name + " " + (int)(Math.random() * 100) + "", { memory: { idToGo: sources[i].id }}) == 0 ) break;
                    }
                }
            }
        }
        if (NBrole[1] < sources.length) {
            for ( var creep in creeps ) {
                if ( creep.name[0] == 'T' ) tab[ creep.name[1] ] == 1;
            }
            for ( var i = 0 ; i < sources.length ; i++ ) {
                if(!tab[i]) {
                    for ( var spawn in spawns ) {
                        if ( spawn.spawnCreep(toolsManager.modulesNeeded("truck", Room.energyAvailable, 2), "T" + i + " " + Room.name + " " + (int)(Math.random() * 100) + "", { memory: { idToGo: sources[i].id }} ) == 0 ) break;
                    }
                }
            }
        }
        if( NBrole[2] == 0 ) {
            for ( var spawn in spawns ) {
                if ( spawn.spawnCreep(toolsManager.modulesNeeded("upgrader", Room.energyAvailable, 2), "U" + " " + Room.name + " " + (int)(Math.random() * 100) + "") == 0 ) break;
            }
        }
    }
}
module.exports = spawnManager;
