import { Suspense } from "react";
import { DoubleSide } from "three";
import { useNavigate } from "react-router";
import { Box, Button, VStack } from "@chakra-ui/react";
import {
  Environment,
  Loader,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { styles } from "./PondPage.style";
import { Boids, Bubbles } from "./components";
import { useBoundary } from "./hooks";

export const PondPage = () => {
  // Boundary hooks
  const { responsiveBoundary } = useBoundary();

  // Navigation hooks
  const navigate = useNavigate();

  const isShowBoundary: boolean = false;

  return (
    <VStack sx={styles.page}>
      {/* Loader */}
      <Loader />

      {/* Background */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, teal.400, blue.400)"
        zIndex={0}
      />

      <Button
        position={"absolute"}
        zIndex={2}
        onClick={() => navigate("/draw")}
        sx={styles.button}
      >
        Draw Your Fish!
      </Button>

      {/* R3F Canvas */}
      <Canvas
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
        shadows
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <Suspense fallback={null}>
          <OrbitControls />

          {/* Boids */}
          <Boids boundary={responsiveBoundary} />

          <Bubbles />

          {/* Boundary */}
          {/* TODO: remove after testing */}
          {isShowBoundary ? (
            <mesh>
              <boxGeometry
                args={[
                  responsiveBoundary.x,
                  responsiveBoundary.y,
                  responsiveBoundary.z,
                ]}
              />
              <meshStandardMaterial
                color={"orange"}
                transparent={true}
                opacity={0.5}
                side={DoubleSide}
              />
            </mesh>
          ) : null}

          {/* Lighting */}
          <SoftShadows size={15} focus={1.5} samples={12} />
          <Environment preset="sunset"></Environment>
          <directionalLight
            position={[15, 15, 15]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            shadow-camera-far={300}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.1}
          />
          <hemisphereLight
            intensity={1.35}
            color={"#309BFF"}
            groundColor={"#DDD6F3"}
          />
        </Suspense>
      </Canvas>
    </VStack>
  );
};
