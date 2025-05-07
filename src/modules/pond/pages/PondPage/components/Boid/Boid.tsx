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
  const { scene, animations } = useGLTF(`/models/${model}.glb`);
  const texture = useLoader(TextureLoader, textureUrl);

  const clone = useMemo(() => SkeletonUtils.clone(scene) as Group, [scene]);
  const group = useRef<Group>(null);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    clone.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;

        if (Array.isArray(mesh.material)) {
          // Apply texture to multi-material meshes
          mesh.material.forEach((material) => {
            if ("map" in material) {
              material.map = texture;
              material.needsUpdate = true;
            }
          });
        } else if ("map" in mesh.material) {
          // Apply texture to single-material meshes
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [clone, texture]);

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
