var spawnManager = require('spawnManager');
var roomManager = require('roomManager');
var toolsManager = require('toolsManager');

module.exports.loop = function () {
    //var missions;
    
    if( --(Memory.tickBeforeCleanMemory) < 0 ) {
        toolsManager.cleanMemory();
        Memory.tickBeforeCleanMemory = 1500;
    }
    var mission;
    for( var a_room in Game.rooms ) {
        //mission = 
        
        roomManager.run(Game.rooms[a_room]);
        
        //if (mission) missions.push(mission);
    }
    /*for( var mission in missions ) {
        missionManagement.run(mission);
    }*/
}
