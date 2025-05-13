import { useMemo } from "react";
import { Vector3 } from "three";
import { randomFloat } from "@/utils";
import { Boid } from "../Boid";
import { useTexture } from "./hooks";
import { IBoidProps } from "../";
import { IBoidsProps } from "./Boids.props";

export const Boids = ({ boundary }: IBoidsProps) => {
  const { textureUrls } = useTexture();

  const BOIDS_SETTINGS = {
    NB_BOIDS: textureUrls.length,
    MIN_SCALE: 0.7,
    MAX_SCALE: 1.3,
    MIN_SPEED: 0.9,
    MAX_SPEED: 3.6,
  };

  const boids = useMemo(() => {
    const res: IBoidProps[] = [];
    textureUrls.map((url) => {
      res.push({
        position: new Vector3(
          randomFloat(-boundary.x / 2, boundary.x / 2),
          randomFloat(-boundary.y / 2, boundary.y / 2),
          randomFloat(-boundary.z / 2, boundary.z / 2),
        ),
        model: "Koi_01",
        animation: "Fish_Armature|Swimming_Fast",
        textureUrl: url,
      });
    });

    return res;
  }, [boundary, textureUrls]);

  if (BOIDS_SETTINGS.NB_BOIDS === 0) return <></>;

  return (
    <>
      {boids.map((boid, key) => {
        return <Boid key={`Boid-${key}-${boid.textureUrl}`} {...boid} />;
      })}
    </>
  );
};
