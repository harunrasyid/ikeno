import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Group, Mesh, Object3D, Object3DEventMap, TextureLoader } from "three";
import { SkeletonUtils } from "three-stdlib";

export function useTexture(scene: Group<Object3DEventMap>, textureUrl: string) {
  const texture = useLoader(TextureLoader, textureUrl);
  texture.flipY = false;

  // Clone the scene to make it safe for reuse
  const clone = useMemo(() => SkeletonUtils.clone(scene) as Group, [scene]);

  // Apply texture to all mesh materials
  useEffect(() => {
    clone.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;

        // @ts-expect-error: dynamically added texture
        mesh.material = mesh.material.clone();

        // @ts-expect-error: dynamically added texture
        mesh.material.map = texture;
        // @ts-expect-error: to apply the new texture
        mesh.material.needsUpdate = true;
        // @ts-expect-error: set to white so texture shows as-is
        mesh.material.color.set(0xffffff);
      }
    });
  }, [clone, texture]);

  return {
    clone,
  };
}
