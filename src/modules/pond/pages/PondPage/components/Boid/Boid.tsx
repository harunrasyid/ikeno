import { useGLTF } from "@react-three/drei";
import { IBoidProps } from "./Boid.props";
import { useTexture } from "./hooks";
import { useAnimation } from "../../hooks";

export const Boid = ({
  position,
  model,
  animation,
  textureUrl,
  velocity,
  ...rest
}: IBoidProps) => {
  // Load the GLB model
  const { scene, animations } = useGLTF(`/models/${model}.glb`);

  // Texture overlay hooks
  const { clone } = useTexture(scene, textureUrl);

  // Animation overlay hooks
  const { group } = useAnimation(animations, animation, velocity, position);

  return (
    <group {...rest} ref={group} position={position}>
      <primitive object={clone} rotation-y={Math.PI / 2} />
    </group>
  );
};
