import { Box, Spinner } from "@chakra-ui/react";
import { ILoadingOverlayProps } from "./LoadingOverlay.props";

export const LoadingOverlay = ({ isLoading = false }: ILoadingOverlayProps) => {
  // Dont show anything if isLoading false
  if (!isLoading) return <></>;

  // Show loading overlay if isLoading is true
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
    >
      <Spinner size="xl" color="teal.500" />
    </Box>
  );
};
