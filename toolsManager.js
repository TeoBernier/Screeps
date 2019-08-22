function modulesNeeded(role, energyAmount, biomeMalus) {
    var body = [];
    if (role == 'miner') {
        var partCount = 0.0;
        for (var i = 0 ; i < 6 ; i++) {
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
        body.push(MOVE);
        energyAmount -= 50;
        for ( var i = 0 ; i < energyAmount/21 ; i+=50) {
            body.push(CARRY);
            energyAmount -= 50;
        }
        while (energyAmount >= 100) {
            body.push(WORK);
            energyAmount -= 100;
        }
    } else if (role == 'littletruck') {
        return [CARRY, CARRY, MOVE];
    }
    return body;
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

function cleanMemory() {
    for ( var a_creep in Memory.creeps ) {
        if(!Game.creeps[a_creep]) {
            delete Memory.creeps[a_creep];
        }
    }
}

function constructionsRemaining(a_room) {
    var constructions = {};
    var my_structures = a_room.find(FIND_MY_STRUCTURES);
    var my_constructionSites = a_room.find(FIND_MY_CONSTRUCTION_SITES);
    constructions[STRUCTURE_SPAWN] = countStructureType(my_structures, STRUCTURE_SPAWN) + countStructureType(my_constructionSites, STRUCTURE_SPAWN);
    constructions[STRUCTURE_EXTENSION] = countStructureType(my_structures, STRUCTURE_EXTENSION) + countStructureType(my_constructionSites, STRUCTURE_EXTENSION);
    constructions[STRUCTURE_ROAD] = countStructureType(my_structures, STRUCTURE_ROAD) + countStructureType(my_constructionSites, STRUCTURE_ROAD);
    constructions[STRUCTURE_WALL] = countStructureType(my_structures, STRUCTURE_WALL) + countStructureType(my_constructionSites, STRUCTURE_WALL);
    constructions[STRUCTURE_RAMPART] = countStructureType(my_structures, STRUCTURE_RAMPART) + countStructureType(my_constructionSites, STRUCTURE_RAMPART);
    constructions[STRUCTURE_LINK] = countStructureType(my_structures, STRUCTURE_LINK) + countStructureType(my_constructionSites, STRUCTURE_LINK);
    constructions[STRUCTURE_STORAGE] = countStructureType(my_structures, STRUCTURE_STORAGE) + countStructureType(my_constructionSites, STRUCTURE_STORAGE);
    constructions[STRUCTURE_TOWER] = countStructureType(my_structures, STRUCTURE_TOWER) + countStructureType(my_constructionSites, STRUCTURE_TOWER);
    constructions[STRUCTURE_OBSERVER] = countStructureType(my_structures, STRUCTURE_OBSERVER) + countStructureType(my_constructionSites, STRUCTURE_OBSERVER);
    constructions[STRUCTURE_POWER_SPAWN] = countStructureType(my_structures, STRUCTURE_POWER_SPAWN) + countStructureType(my_constructionSites, STRUCTURE_POWER_SPAWN);
    constructions[STRUCTURE_EXTRACTOR] = countStructureType(my_structures, STRUCTURE_EXTRACTOR) + countStructureType(my_constructionSites, STRUCTURE_EXTRACTOR);
    constructions[STRUCTURE_LAB] = countStructureType(my_structures, STRUCTURE_LAB) + countStructureType(my_constructionSites, STRUCTURE_LAB);
    constructions[STRUCTURE_TERMINAL] = countStructureType(my_structures, STRUCTURE_TERMINAL) + countStructureType(my_constructionSites, STRUCTURE_TERMINAL);
    constructions[STRUCTURE_CONTAINER] = countStructureType(my_structures, STRUCTURE_CONTAINER) + countStructureType(my_constructionSites, STRUCTURE_CONTAINER);
    constructions[STRUCTURE_NUKER] = countStructureType(my_structures, STRUCTURE_NUKER) + countStructureType(my_constructionSites, STRUCTURE_NUKER);
    
    for( var a_construction in constructions) {
        constructions[a_construction] = CONTROLLER_STRUCTURES[a_construction][a_room.controller.level] - constructions[a_construction];
    }
    return constructions;
}

function countStructureType(constructions, structureType) {
    var i = 0;
    for ( var a_construction in constructions ) {
        if ( constructions[a_construction].structureType == structureType ) i++;
    }
    return i;
}

function countBodyPart(body, part) {
    var i = 0;
    for ( var a_part in body ) {
        if ( body[a_part] == part ) i++;
    }
    return i;
}



module.exports = {
    modulesNeeded: modulesNeeded,
    positionFreeNear: positionFreeNear,
    cleanMemory: cleanMemory,
    constructionsRemaining: constructionsRemaining,
    countStructureType: countStructureType,
    countBodyPart: countBodyPart,
};
