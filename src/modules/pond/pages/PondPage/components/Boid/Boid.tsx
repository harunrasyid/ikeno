import { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { Group, Mesh, Object3D, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { IBoidProps } from "./Boid.props";

export const Boid = ({
  position,
  model,
  animation,
  textureUrl,
}: IBoidProps) => {
  // Load the GLB model
  const { scene, animations } = useGLTF(`/models/${model}.glb`);

  // Load the custom-painted texture
  const texture = useLoader(TextureLoader, textureUrl);
  texture.flipY = false;

  // Clone the scene to make it safe for reuse
  const clone = useMemo(() => SkeletonUtils.clone(scene) as Group, [scene]);

  const group = useRef<Group>(null);

  // Set up animation actions
  const { actions } = useAnimations(animations, group);

  // Apply texture to all mesh materials
  useEffect(() => {
    clone.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;

        const material = mesh.material;

        // @ts-expect-error: fix later
        material.map = texture;
        // @ts-expect-error: fix later
        material.needsUpdate = true;
        // @ts-expect-error: fix later
        material.color.set(0xffffff);
      }
    });
  }, [clone, texture]);

  // Play the animation
  useEffect(() => {
    actions?.[animation]?.play();
    return () => {
      actions?.[animation]?.stop();
    };
  }, [animation, actions]);

  return (
    <group ref={group} position={position}>
      <primitive object={clone} rotation-y={Math.PI / 2} />
    </group>
  );
};
