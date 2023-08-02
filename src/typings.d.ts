declare enum Role {
  HARVESTER,
  UPGRADER,
  BUILDER,
}

interface CreepMemory {
  role: Role;
  building?: boolean;
}
