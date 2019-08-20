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
    run: function(a_room, NBrole) {
        var sourcesList = a_room.find(FIND_SOURCES);
        var creepsList = a_room.find(FIND_MY_CREEPS);
        var spawnsList = a_room.find(FIND_MY_SPAWNS);
        //---------------------------------------- CHECK DES MINEURS ------------------------------------
        if (NBrole[0] < sourcesList.length) {
            var tab = [sourcesList.length].fill(0);
            for ( var a_creep in creepsList ) {
                if ( a_creep.name[0] == 'M' ) tab[ a_creep.name[1] ] == 1;
            }
            for ( var i = 0 ; i < sourcesList.length ; i++ ) {
                if(!tab[i]) {
                    for ( var a_spawn in spawnsList ) {
                        if ( a_spawn.spawnCreep(toolsManager.modulesNeeded("miner", a_room.energyAvailable, 2), "M" + i + " " + a_room.name + " " + Math.floor(Math.random() * 100) + "", { memory: { idToGo: sourcesList[i].id }}) == 0 ) break;
                    }
                }
            }
        }
        if (NBrole[1] < sourcesList.length) {
            for ( var a_creep in creepsList ) {
                if ( a_creep.name[0] == 'T' ) tab[ a_creep.name[1] ] == 1;
            }
            for ( var i = 0 ; i < sourcesList.length ; i++ ) {
                if(!tab[i]) {
                    for ( var a_spawn in spawnsList ) {
                        if ( a_spawn.spawnCreep(toolsManager.modulesNeeded("truck", a_room.energyAvailable, 2), "T" + i + " " + a_room.name + " " + Math.floor(Math.random() * 100) + "", { memory: { idToGo: sourcesList[i].id }} ) == 0 ) break;
                    }
                }
            }
        }
        if( NBrole[2] == 0 ) {
            for ( var a_spawn in spawnsList ) {
                if ( a_spawn.spawnCreep(toolsManager.modulesNeeded("upgrader", a_room.energyAvailable, 2), "U" + " " + a_room.name + " " + Math.floor(Math.random() * 100) + "") == 0 ) break;
            }
        }
    }
}
module.exports = spawnManager;
