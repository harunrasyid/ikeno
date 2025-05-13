import { Vector3 } from "three";

export interface IBoidProps {
  position: Vector3;
  model: string;
  animation: string;
  textureUrl: string;
  velocity: Vector3;
  wander: number;
  scale: number;
}
