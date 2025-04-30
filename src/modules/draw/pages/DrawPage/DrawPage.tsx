import { Button, Text, VStack } from "@chakra-ui/react";
import { styles } from "./DrawPage.style";

export const DrawPage = () => {
  return (
    <VStack sx={styles.page}>
      {/* Title */}
      <Text sx={styles.title}>Draw Your Koi</Text>

      {/* Drawing Canvas */}
      <VStack sx={styles.canvasContainer}>
        <canvas
          style={{ width: "100%", height: "100%", cursor: "crosshair" }}
        />
      </VStack>

      {/* Submit Button */}
      <VStack sx={styles.buttonContainer}>
        <Button sx={styles.button}>Release to Pond</Button>
      </VStack>
    </VStack>
  );
};
