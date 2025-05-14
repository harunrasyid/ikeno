import { useEffect, useRef } from "react";
import { AnimationClip, Group, Vector3 } from "three";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function useAnimation(
  animations: AnimationClip[],
  animation: string,
  velocity: Vector3,
  position: Vector3,
) {
  const group = useRef<Group>(null);

  // Set up animation actions
  const { actions } = useAnimations(animations, group);

  // Play the animation
  useEffect(() => {
    actions?.[animation]?.play();
    return () => {
      actions?.[animation]?.stop();
    };
  }, [animation, actions]);

  useFrame(() => {
    if (group.current) {
      const target = group.current.clone(false);
      target.lookAt(group.current.position.clone().add(velocity));
      group.current.quaternion.slerp(target.quaternion, 0.1);

      group.current.position.copy(position);
    }
  });

  return {
    group,
  };
}
