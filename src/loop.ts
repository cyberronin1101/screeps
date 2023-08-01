import { roleHarvester } from "./roles/harvester.role";
import { roleUpgrader } from "./roles/upgrader.role";

module.exports.loop = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case "harvester":
        roleHarvester.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
    }
  }
};
