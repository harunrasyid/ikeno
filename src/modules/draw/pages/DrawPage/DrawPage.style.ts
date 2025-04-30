import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  page: {
    height: "100vh",
    width: "100vw",
    padding: "24px",
    gap: "24px",

    // Background related
    bgGradient: "linear(to-b, teal.400, blue.400)",
  },

  title: {
    color: "white",
    fontWeight: "600",
    fontSize: "xx-large",
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
};

export { styles };
