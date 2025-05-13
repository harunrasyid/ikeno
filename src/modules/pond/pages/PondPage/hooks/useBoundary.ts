import { useEffect, useState } from "react";
import { IBoundary } from "../types";
import { INITIAL_BOUNDARY } from "../constants";

export function useBoundary() {
  const initialBoundary: IBoundary = INITIAL_BOUNDARY;

  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  const scaleX = Math.max(0.5, size[0] / 1920);
  const scaleY = Math.max(0.5, size[1] / 1080);

  const responsiveBoundary: IBoundary = {
    x: initialBoundary.x * scaleX,
    y: initialBoundary.y * scaleY,
    z: initialBoundary.z,
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const updateSize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }, 50);
    };
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(timeout);
    };
  }, []);

  return {
    responsiveBoundary,
  };
}
