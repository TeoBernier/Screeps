var spawnManager = require('spawnManager');
var roomManager = require('roomManager');

module.exports.loop = function () {
    //var missions;
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
