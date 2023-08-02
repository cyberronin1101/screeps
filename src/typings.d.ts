import { Role } from "./types";

declare global {
  interface CreepMemory {
    role: Role;
    building?: boolean;
  }
}
