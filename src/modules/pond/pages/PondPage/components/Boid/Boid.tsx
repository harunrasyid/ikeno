import { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { Group, Mesh, Object3D } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { IBoidProps } from "./Boid.props";

export const Boid = ({ position, model, animation }: IBoidProps) => {
  const { scene, animations } = useGLTF(`/models/${model}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene) as Group, [scene]);
  const group = useRef<Group>(null);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    clone.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
      }
    });
  }, [clone]);

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
