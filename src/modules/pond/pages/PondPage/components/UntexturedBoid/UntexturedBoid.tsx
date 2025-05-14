import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useAnimation } from "../../hooks";
import { IUntexturedBoidProps } from "./UntexturedBoid.props";

export const UntexturedBoid = ({
  position,
  model,
  animation,
  velocity,
  ...rest
}: IUntexturedBoidProps) => {
  // Load the GLB model
  const { scene, animations } = useGLTF(`/models/${model}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Animation overlay hooks
  const { group } = useAnimation(animations, animation, velocity, position);

  return (
    <group {...rest} ref={group} position={position}>
      <primitive object={clone} rotation-y={Math.PI / 2} />
    </group>
  );
};
