import { Vector3 } from "three";
import { Boid } from "../Boid";

export const Boids = () => {
  return (
    <>
      <Boid
        position={new Vector3(0, 0, 0)}
        model={"Koi_01"}
        animation={"Fish_Armature|Swimming_Fast"}
      />
    </>
  );
};
