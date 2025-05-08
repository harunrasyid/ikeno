import { useNavigate } from "react-router";
import {
  Button,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { dataURLtoBlob } from "@/utils";
import { images } from "@/assets/images";
import { styles } from "./DrawPage.style";
import { useDraw, useUpload } from "./hooks";

export const DrawPage = () => {
  const {
    canvasRef,
    exportImage,
    color,
    setColor,
    clearCanvas,
    isCanvasEmpty,
  } = useDraw();
  const { upload } = useUpload();
  const navigate = useNavigate();

  const handleExport = async () => {
    const dataUrl = exportImage();
    if (!dataUrl) return;

    const blob = dataURLtoBlob(dataUrl);
    await upload(blob);
    clearCanvas();
    navigate(`/pond`);
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
          style={{
            width: "1024px",
            height: "1024px",
            cursor: "crosshair",
            touchAction: "none",
            zIndex: 5,
          }}
        ></canvas>
        <Image src={images.guideline} sx={styles.guideline} />
      </VStack>

      {/* Submit Button */}
      <VStack sx={styles.buttonContainer}>
        <Button
          sx={styles.button}
          disabled={isCanvasEmpty}
          onClick={handleExport}
        >
          Release to Pond
        </Button>
      </VStack>
    </VStack>
  );
};
