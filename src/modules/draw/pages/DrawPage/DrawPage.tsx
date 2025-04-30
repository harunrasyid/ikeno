import { Button, HStack, Input, Spacer, Text, VStack } from "@chakra-ui/react";
import { styles } from "./DrawPage.style";
import { useDraw } from "./hooks";

export const DrawPage = () => {
  const { canvasRef, exportImage, color, setColor, clearCanvas } = useDraw();

  const handleExport = () => {
    const image = exportImage();
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "koi_drawing.png";
      link.click();
    }
  };

  return (
    <VStack sx={styles.page}>
      {/* Title & Settings */}
      <HStack sx={styles.titleContainer}>
        <Spacer />

        {/* Title */}
        <Text sx={styles.title}>Draw Your Koi</Text>
        <Spacer />

        {/* Color */}
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          sx={styles.color}
        />

        {/* Clear Canvas */}
        <Button onClick={clearCanvas} sx={styles.clearButton}>
          Clear
        </Button>
      </HStack>

      {/* Drawing Canvas */}
      <VStack sx={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", cursor: "crosshair" }}
        />
      </VStack>

      {/* Submit Button */}
      <VStack sx={styles.buttonContainer}>
        <Button sx={styles.button} onClick={handleExport}>
          Release to Pond
        </Button>
      </VStack>
    </VStack>
  );
};
