function modulesNeeded(role, energyAmount, biomeMalus) {
    var body = [];
    if (role == 'miner') {
        var partCount = 0.0;
        for (var i = 0 ; i < 5 ; i++) {
            if (energyAmount < 150) {
                break;
            }
            energyAmount -= 100;
            body.push(WORK);
            partCount++;
        }
        while (energyAmount >= 50 && partCount > 0) {
            body.push(MOVE);
            partCount -= 2.0 / biomeMalus;
            energyAmount -= 50;
        }
    } else if (role == 'truck') {
        var nbMove = biomeMalus / 2.0;
        nbMove = nbMove / (nbMove + 1) * energyAmount;
        while ( nbMove > 0 ) {
            body.push(MOVE);
            energyAmount -= 50;
            nbMove -= 50;
        }
        while ( energyAmount >= 50 ) {
            body.push(CARRY);
            energyAmount -= 50;
        }
    } else if (role == 'upgrader') {
        body.push(CARRY);
        body.push(MOVE);
        energyAmount -= 100;
        while (energyAmount >= 100) {
            body.push(WORK);
            energyAmount -= 100;
        }
    }
    return body;
};

function positionNear(a_position, radius) {
    var positionsList = Game.rooms[a_position.roomName].lookForAtArea(LOOK_TERRAIN,a_position.y + radius, a_position.x - radius, a_position.y - radius, a_position.x + radius);
};

function positionFreeFilter(position){
    return position;
};

module.exports = {
    modulesNeeded: modulesNeeded,
    positionNear: positionNear,
    positionFreeFilter: positionFreeFilter
};
