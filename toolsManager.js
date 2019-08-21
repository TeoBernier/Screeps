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
    } else if (role == 'builder') {
        body.push(CARRY);
        body.push(MOVE);
        body.push(WORK);
        energyAmount -= 200;
        while (energyAmount >= 100) {
            body.push(WORK);
            energyAmount -= 100;
        }
    }
    return body;
    //it seems may return [CARRY,MOVE] without WORK!;
};

function positionFreeNear(a_position, a_room, rayon) {
    var positionsList = [];
    var objectsList = a_room.lookAtArea(a_position.y - rayon, a_position.x - rayon, a_position.y + rayon, a_position.x + rayon);
    for ( var i = a_position.y - rayon ; i < a_position.y + rayon + 1 ; i++ ) {
        for ( var j = a_position.x - rayon ; j < a_position.x + rayon + 1 ; j++ ) {
            if (isPositionFree(objectsList[i][j]) == 1 ) positionsList.push(a_room.getPositionAt(j,i));
        }
    }
    return positionsList;
};

function isPositionFree(looked_position) {
    for ( var an_object in looked_position ) {
        if (looked_position[an_object].type == 'structure') return 0;
        else if (looked_position[an_object].type == 'terrain') {
            if(looked_position[an_object].terrain == 'wall') return 0; 
        }
    }
    return 1;
}

function positionFreeFilter(position){
    return position;
};

function cleanMemory() {
    for ( var a_creep in Memory.creeps ) {
        if(!Game.creeps[a_creep]) {
            delete Memory.creeps[a_creep];
        }
    }
}

module.exports = {
    modulesNeeded: modulesNeeded,
    positionFreeNear: positionFreeNear,
    positionFreeFilter: positionFreeFilter,
    cleanMemory: cleanMemory,
};
