var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0 && creep.memory.role != 'harvester') {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity || creep.memory.role == 'harvester' && !creep.memory.building) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                if (creep.carry == creep.carryCapacity) {
                        roleUpgrader.run(creep);
                        stop
                    
                }
            }
	    }
	    else {
	        var sources = Game.getObjectById('579faa3a0700be0674d30ab4') ;
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);

            }
	    }
	}
};

module.exports = roleBuilder;