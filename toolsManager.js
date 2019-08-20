var toolsManager = {
    modulesNeeded: function(role, energyAmount, biomeMalus, option = NULL) {
        var body = array<string>[0];
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
            option = partCount * 2;
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
    }

};
module.exports = toolsManager;
