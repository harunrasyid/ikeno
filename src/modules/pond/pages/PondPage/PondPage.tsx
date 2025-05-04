import { Suspense } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { styles } from "./PondPage.style";

const THEMES = {
  underwater: {
    key: "underwater",
    skyColor: "#309BFF",
    sunColor: "#FE9E40",
    groundColor: "#DDD6F3",
    title: "Underwater",
    subtitle: "World",
    models: [
      `Koi_01`,
      `Koi_02`,
      `Koi_03`,
      `Koi_04`,
      `Koi_05`,
      `Koi_06`,
      `Koi_07`,
    ],
    dof: true,
  },
};

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
