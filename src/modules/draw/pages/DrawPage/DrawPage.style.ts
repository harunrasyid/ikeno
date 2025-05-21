import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  page: {
    height: "100dvh",
    width: "100vw",
    padding: "24px",
    gap: "24px",

    // Background related
    bgGradient: "linear(to-b, teal.400, blue.400)",
  },

  titleContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: "xx-large",
  },
  color: {
    maxWidth: "40px",
    maxHeight: "40px",
    padding: "0",
    border: "none",
    borderRadius: "full",
    background: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    overflow: "hidden",
    cursor: "pointer",
    aspectRatio: 1,
    "&::-webkit-color-swatch-wrapper": {
      padding: 0,
    },
    "&::-webkit-color-swatch": {
      border: "none",
      borderRadius: "50%",
    },
    "&::-moz-color-swatch": {
      border: "none",
      borderRadius: "50%",
    },
  },
  clearButton: {
    bgGradient: "linear(to-br, red.400, pink.300)",
    color: "white",
    borderRadius: "full",
    px: 6,
    py: 4,
    fontWeight: "medium",
    boxShadow: "md",
    transition: "all 0.3s ease-in-out",
    _hover: {
      bgGradient: "linear(to-br, red.500, pink.400)",
      boxShadow: "lg",
      transform: "scale(1.05)",
    },
    _active: {
      transform: "scale(0.98)",
      boxShadow: "sm",
    },
    _focus: {
      outline: "none",
      boxShadow: "0 0 0 3px rgba(255, 100, 100, 0.4)",
    },
  },

  canvasContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    backdropFilter: "blur(24px)",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "2xl",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    color: "white",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  button: {
    bgGradient: "linear(to-br, teal.300, blue.200)",
    color: "#2C5282",
    borderRadius: "full",
    px: 6,
    py: 4,
    fontWeight: "medium",
    boxShadow: "md",
    transition: "all 0.3s ease-in-out",
  },

  guideline: {
    position: "absolute",
    height: "100%",
    aspectRatio: 1,
    border: "3px solid red",
  },
};

export { styles };
