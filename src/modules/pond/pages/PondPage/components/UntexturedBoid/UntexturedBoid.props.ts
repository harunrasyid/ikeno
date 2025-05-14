import { Vector3 } from "three";

export interface IUntexturedBoidProps {
  position: Vector3;
  model: string;
  animation: string;
  velocity: Vector3;
  wander: number;
  scale: number;
}
