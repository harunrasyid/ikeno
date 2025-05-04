import { Suspense } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { styles } from "./PondPage.style";

export const PondPage = () => {
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

      {/* Canvas */}
      <Canvas
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Suspense fallback={null}>
          {/* TODO */}
          <></>
        </Suspense>
      </Canvas>
    </VStack>
  );
};
