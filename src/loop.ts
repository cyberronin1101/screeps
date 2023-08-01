import { roleHarvester } from "./roles/harvester.role";
import { roleUpgrader } from "./roles/upgrader.role";
import { roleBuilder } from "./roles/builder.role";

module.exports.loop = () => {
  for (const name in Game.rooms) {
    console.log(
      `Room "${name}" has ${Game.rooms[name].energyAvailable} energy`,
    );
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case "harvester":
        roleHarvester.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
      case "builder":
        roleBuilder.run(creep);
        break;
    }
  }
};
