var spawnManager = require('spawnManager');
var roomManager = require('roomManager');

module.exports.loop = function () {
    //var missions;
    var mission;
    for( var room in Game.rooms.values ) {
        /*mission = */roomManager.run(room);
        //if (mission) missions.push(mission);
    }
    /*for( var mission in missions ) {
        missionManagement.run(mission);
    }*/
}
