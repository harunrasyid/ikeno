import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  page: {
    height: "100vh",
    width: "100vw",
  },

  button: {
    bgGradient: "linear(to-br, red.400, red.600)",
    color: "#FFFFFF",
    borderRadius: "full",
    px: 6,
    py: 4,
    fontWeight: "medium",
    boxShadow: "md",
    transition: "all 0.3s ease-in-out",
    bottom: "36px",
  },
};

export { styles };
