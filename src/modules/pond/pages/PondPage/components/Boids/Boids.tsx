import { useMemo } from "react";
import { Vector3 } from "three";
import { randomFloat } from "@/utils";
import { Boid } from "../Boid";
import { useTexture } from "./hooks";
import { IBoidProps } from "../";
import { IBoidsProps } from "./Boids.props";
import { useFrame } from "@react-three/fiber";

const limits = new Vector3();
const wander = new Vector3();
const horizontalWander = new Vector3();
const alignment = new Vector3();
const avoidance = new Vector3();
const cohesion = new Vector3();

const steering = new Vector3();

function remap(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export const Boids = ({ boundary }: IBoidsProps) => {
  const { textureUrls } = useTexture();

  const BOIDS_SETTINGS = {
    NB_BOIDS: textureUrls.length,
    MIN_SCALE: 0.3,
    MAX_SCALE: 1,
    MIN_SPEED: 0.2,
    MAX_SPEED: 1,
    MAX_STEERING: 0.1,
  };

  const WANDER_SETTINGS = {
    WANDER_RADIUS: 6,
    WANDER_STRENGTH: 2,
  };

  const ALIGNMENT_SETTINGS = {
    ALIGN_RADIUS: 1.2,
    ALIGN_STRENGTH: 1,
  };

  const AVOID_SETTINGS = {
    AVOID_RADIUS: 0.8,
    AVOID_STRENGTH: 2,
  };

  const COHESION_SETTINGS = {
    COHESION_RADIUS: 1.22,
    COHESION_STRENGTH: 4,
  };

  const RULES = {
    ALIGNEMENT: true,
    AVOIDANCE: true,
    COHESION: true,
  };

  const boids = useMemo(() => {
    const res: IBoidProps[] = [];
    const scaleData: number = randomFloat(
      BOIDS_SETTINGS.MIN_SCALE,
      BOIDS_SETTINGS.MAX_SCALE
    );

    textureUrls.map((url) => {
      res.push({
        position: new Vector3(
          randomFloat(-boundary.x / 2, boundary.x / 2),
          randomFloat(-boundary.y / 2, boundary.y / 2),
          randomFloat(-boundary.z / 2, boundary.z / 2)
        ),
        model: "Koi_01",
        animation: "Fish_Armature|Swimming_Fast",
        textureUrl: url,
        velocity: new Vector3(0, 0, 0),
        wander: randomFloat(0, Math.PI * 2),
        scale: scaleData,
      });
    });

    return res;
  }, [boundary, textureUrls]);

  useFrame((_, delta) => {
    for (let i = 0; i < boids.length; i++) {
      const boid = boids[i];

      // WANDER
      boid.wander += randomFloat(-0.05, 0.05);

      wander.set(
        Math.cos(boid.wander) * WANDER_SETTINGS.WANDER_RADIUS,
        Math.sin(boid.wander) * WANDER_SETTINGS.WANDER_RADIUS,
        0
      );

      wander.normalize();
      wander.multiplyScalar(WANDER_SETTINGS.WANDER_STRENGTH);

      horizontalWander.set(
        Math.cos(boid.wander) * WANDER_SETTINGS.WANDER_RADIUS,
        0,
        Math.sin(boid.wander) * WANDER_SETTINGS.WANDER_RADIUS
      );

      horizontalWander.normalize();
      horizontalWander.multiplyScalar(WANDER_SETTINGS.WANDER_STRENGTH);

      // RESET FORCES
      limits.multiplyScalar(0);
      steering.multiplyScalar(0);
      alignment.multiplyScalar(0);
      avoidance.multiplyScalar(0);
      cohesion.multiplyScalar(0);

      // LIMITS
      if (Math.abs(boid.position.x) + 1 > boundary.x / 2) {
        limits.x = -boid.position.x;
        boid.wander += Math.PI;
      }
      if (Math.abs(boid.position.y) + 1 > boundary.y / 2) {
        limits.y = -boid.position.y;
        boid.wander += Math.PI;
      }
      if (Math.abs(boid.position.z) + 1 > boundary.z / 2) {
        limits.z = -boid.position.z;
        boid.wander += Math.PI;
      }
      limits.normalize();
      limits.multiplyScalar(50);

      let totalCohesion = 0;

      // Loop through all boids
      for (let b = 0; b < boids.length; b++) {
        if (b === i) {
          // skip to get only other boids
          continue;
        }
        const other = boids[b];
        let d = boid.position.distanceTo(other.position);
        // ALIGNEMENT
        if (d > 0 && d < ALIGNMENT_SETTINGS.ALIGN_RADIUS) {
          const copy = other.velocity.clone();
          copy.normalize();
          copy.divideScalar(d);
          alignment.add(copy);
        }

        // AVOID
        if (d > 0 && d < AVOID_SETTINGS.AVOID_RADIUS) {
          const diff = boid.position.clone().sub(other.position);
          diff.normalize();
          diff.divideScalar(d);
        }

        // COHESION
        if (d > 0 && d < COHESION_SETTINGS.COHESION_RADIUS) {
          cohesion.add(other.position);
          totalCohesion++;
        }
      }

      // APPLY FORCES

      steering.add(limits);
      steering.add(wander);

      if (RULES.ALIGNEMENT) {
        alignment.normalize();
        alignment.multiplyScalar(ALIGNMENT_SETTINGS.ALIGN_STRENGTH);
        steering.add(alignment);
      }

      if (RULES.AVOIDANCE) {
        avoidance.normalize();
        avoidance.multiplyScalar(AVOID_SETTINGS.AVOID_STRENGTH);
        steering.add(avoidance);
      }

      if (RULES.COHESION && totalCohesion > 0) {
        cohesion.divideScalar(totalCohesion);
        cohesion.sub(boid.position);
        cohesion.normalize();
        cohesion.multiplyScalar(COHESION_SETTINGS.COHESION_STRENGTH);
        steering.add(cohesion);
      }

      steering.clampLength(0, BOIDS_SETTINGS.MAX_STEERING * delta);
      boid.velocity.add(steering);
      boid.velocity.clampLength(
        0,
        remap(
          boid.scale,
          BOIDS_SETTINGS.MIN_SCALE,
          BOIDS_SETTINGS.MAX_SCALE,
          BOIDS_SETTINGS.MAX_SPEED,
          BOIDS_SETTINGS.MIN_SPEED
        ) * delta
      );

      // APPLY VELOCITY
      boid.position.add(boid.velocity);
    }
  });

  if (BOIDS_SETTINGS.NB_BOIDS === 0) return <></>;

  return (
    <>
      {boids.map((boid, key) => {
        return <Boid key={`Boid-${key}-${boid.textureUrl}`} {...boid} />;
      })}
    </>
  );
};
