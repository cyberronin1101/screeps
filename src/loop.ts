import { roleHarvester } from "./roles/harvester.role";

module.exports.loop = () => {
  for (const name in Game.creeps) {
    roleHarvester.run(Game.creeps[name]);
  }
};
