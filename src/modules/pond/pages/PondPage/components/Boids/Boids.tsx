import { Vector3 } from "three";
import { Boid } from "../Boid";
import { useTexture } from "./hooks";

export const Boids = () => {
  const { textureUrls } = useTexture();

  if (textureUrls.length === 0) return <></>;

  return (
    <>
      <Boid
        position={new Vector3(0, 0, 0)}
        model={"Koi_01"}
        animation={"Fish_Armature|Swimming_Fast"}
        textureUrl={textureUrls[0]}
      />
    </>
  );
};
