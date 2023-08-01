import { roleHarvester } from "./roles/harvester.role";
import { roleUpgrader } from "./roles/upgrader.role";

module.exports.loop = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    console.log("creep", creep);

    switch (creep.memory.role) {
      case "harvester":
        roleHarvester.run(creep);
        return;
      case "upgrader":
        roleUpgrader.run(creep);
        return;
    }
  }
};
