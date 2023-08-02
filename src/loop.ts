import { roleHarvester } from "./roles/harvester.role";
import { roleUpgrader } from "./roles/upgrader.role";
import { roleBuilder } from "./roles/builder.role";
import { Role } from "./types";

module.exports.loop = () => {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  const structures = Object.values(Game.structures);

  structures.forEach((structure) => {
    if (structure.structureType === STRUCTURE_TOWER) {
      const tower = structure as StructureTower;

      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (closestHostile) {
        tower.attack(closestHostile);
        return;
      }

      const closestDamagedStructure = tower.pos.findClosestByRange(
        FIND_STRUCTURES,
        {
          filter: (structure) => structure.hits < structure.hitsMax,
        },
      );

      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
        return;
      }
    }
  });

  const creeps = Object.values(Game.creeps);

  const harvesters = creeps.filter(
    (creep) => creep.memory.role === Role.HARVESTER,
  );

  const spawn = Game.spawns["Spawn1"];

  console.log("Harvesters: " + harvesters.length);

  if (harvesters.length < 2) {
    const newName = `Harvester ${Game.time}`;

    console.log(`Spawning new harvester: ${newName}`);

    spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: Role.HARVESTER },
    });
  }

  if (spawn.spawning) {
    const spawningCreep = Game.creeps[spawn.spawning.name];

    spawn.room.visual.text(
      `🛠️ ${spawningCreep.memory.role}`,
      spawn.pos.x + 1,
      spawn.pos.y,
      { align: "left", opacity: 0.8 },
    );
  }

  for (const name in Game.rooms) {
    console.log(
      `Room "${name}" has ${Game.rooms[name].energyAvailable} energy`,
    );
  }

  creeps.forEach((creep) => {
    switch (String(creep.memory.role)) {
      case Role.HARVESTER:
        roleHarvester.run(creep);
        break;
      case Role.UPGRADER:
        roleUpgrader.run(creep);
        break;
      case Role.BUILDER:
        roleBuilder.run(creep);
        break;
    }
  });
};

// Game.creeps['Harvester1'].suicide()
