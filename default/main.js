var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester2 = require('role.harvester2');

module.exports.loop = function () {
    
//Début du spawn automatique

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
  //  if(harvesters.length < 5) {
    //    var newName = Game.spawns['Spawn'].createCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE], 'Harvester'+ Game.time , {role: 'harvester'});
      //  console.log('Spawning new harvester: ' + newName);
    }
    else {
        if(0){
            //if(harvesters2.length < 1) {
              //  var newName = Game.spawns['Spawn'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], 'Harvester2'+ Game.time , {role: 'harvester2'});
                //console.log('Spawning new harvester2: ' + newName);
            
            
            
        }
        
        else {
            
            if(upgraders.length < 2) {
                var newName = Game.spawns['Spawn'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], "Upgrader" + Game.time , {role: 'upgrader'});
                console.log('Spawning new upgrader: ' + newName);
            }
            else {
                if(builders.length < 6) {
                    var newName = Game.spawns['Spawn'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Builder' + Game.time , {role: 'builder'});
                    console.log('Spawning new builder: ' + newName);
                }
            }
        }
                
    }
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


// Fin du Spawn automatique


    

    var tower = Game.getObjectById('57d71dcbc59786df7ed800f6');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep)
        }
    }
}