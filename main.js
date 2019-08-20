var spawnManager = require('spawnManager');
var roomManager = require('roomManager');

module.exports.loop = function () {
    //var missions;
    var mission;
    for( var a_room in Game.rooms.values ) {
        /*mission = */roomManager.run(a_room);
        //if (mission) missions.push(mission);
    }
    /*for( var mission in missions ) {
        missionManagement.run(mission);
    }*/
}
