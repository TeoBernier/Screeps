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
        if( a_room.energyAvailable < a_room.energyCapacityAvailable ) return;
        console.log(NBrole);
        var sourcesList = a_room.find(FIND_SOURCES);
        var creepsList = a_room.find(FIND_MY_CREEPS);
        var spawnsList = a_room.find(FIND_MY_SPAWNS);
        //---------------------------------------- CHECK DES MINEURS ------------------------------------
        var tab = (new Array(sourcesList.length)).fill(0);
        if (NBrole[0] < sourcesList.length) {
            console.log(sourcesList.length);
            
            for ( var a_creep in creepsList ) {
                if ( creepsList[a_creep].name[0] == 'M' ) tab[ creepsList[a_creep].name[1] ] += 1;
            }
            console.log(tab);
            for ( var i = 0 ; i < sourcesList.length ; i++ ) {
                if(tab[i] == 0) {
                    for ( var a_spawn in spawnsList ) {
                        
                        console.log(i);
                        if ( spawnsList[a_spawn].spawnCreep(toolsManager.modulesNeeded("miner", a_room.energyAvailable, 2), "M" + i + "_" + a_room.name + "_" + Math.floor(Math.random() * 100) + "", { memory: { idToGo: sourcesList[i].id }}) == 0 ) break;
                    }
                }
            }
        } else if (NBrole[1] < sourcesList.length){
            for ( var a_creep in creepsList ) {
                if ( creepsList[a_creep].name[0] == 'T' ) tab[ creepsList[a_creep].name[1] ] += 1;
            }
            for ( var i = 0 ; i < sourcesList.length ; i++ ) {
                if(tab[i] == 0) {
                    for ( var a_spawn in spawnsList ) {
                        if ( spawnsList[a_spawn].spawnCreep(toolsManager.modulesNeeded("truck", a_room.energyAvailable, 2), "T" + i + "_" + a_room.name + "_" + Math.floor(Math.random() * 100) + "", { memory: { idToGo: sourcesList[i].id }} ) == 0 ) break;
                    }
                }
            }
        } else if ( NBrole[2] < 2 ) {
            for ( var a_spawn in spawnsList ) {
                if ( spawnsList[a_spawn].spawnCreep(toolsManager.modulesNeeded("upgrader", a_room.energyAvailable, 2), "U" + "_" + a_room.name + "_" + Math.floor(Math.random() * 100) + "") == 0 ) break;
            }
        } else if ( NBrole[3] < 1 ) {
            for ( var a_spawn in spawnsList ) {
                if ( spawnsList[a_spawn].spawnCreep(toolsManager.modulesNeeded("builder", a_room.energyAvailable, 2), "B" + "_" + a_room.name + "_" + Math.floor(Math.random() * 100) + "") == 0 ) break;
            }
        }
    }
}
module.exports = spawnManager;
