module.exports = {
    moduleNeeded: function(role, energyAmount, biomeMalus, option = NULL) {
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
                partCount -= 2/biomeMalus;
                energyAmount -= 50;
            }
        }
        return body;
    }
    
};
