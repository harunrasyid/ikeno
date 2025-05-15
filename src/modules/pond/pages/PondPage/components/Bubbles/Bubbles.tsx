import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { InstancedMesh, Object3D } from "three";

export const Bubbles = () => {
  const bubbleRef = useRef<InstancedMesh>(null);
  const bubbleCount = 100;
  const temp = new Object3D();
  const velocity = new Array(bubbleCount)
    .fill(0)
    .map(() => new Vector3(0, Math.random() * 0.008 + 0.002, 0));

  useEffect(() => {
    if (!bubbleRef.current) return;

    for (let i = 0; i < bubbleCount; i++) {
      temp.position.set(
        (Math.random() - 0.5) * 12,
        Math.random() * 6 - 3,
        (Math.random() - 0.5) * 12
      );
      temp.updateMatrix();
      bubbleRef.current.setMatrixAt(i, temp.matrix);
    }
    bubbleRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    if (!bubbleRef.current) return;

    for (let i = 0; i < bubbleCount; i++) {
      bubbleRef.current.getMatrixAt(i, temp.matrix);
      temp.position.setFromMatrixPosition(temp.matrix);
      temp.position.add(velocity[i]);

      // Reset bubble position when reaching top
      if (temp.position.y > 6) {
        temp.position.y = -3;
        temp.position.x = (Math.random() - 0.5) * 12;
        temp.position.z = (Math.random() - 0.5) * 12;
      }

      temp.updateMatrix();
      bubbleRef.current.setMatrixAt(i, temp.matrix);
    }
    bubbleRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    // @ts-expect-error: Fix ts error later
    <instancedMesh ref={bubbleRef} args={[null, null, bubbleCount]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color="#FFFFFF"
        transparent
        opacity={0.2}
        roughness={0.5}
        metalness={0.05}
        emissive={"#B4E4FF"}
      />
    </instancedMesh>
  );
};
