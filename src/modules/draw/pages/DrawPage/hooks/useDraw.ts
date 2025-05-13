import { useRef, useEffect, useCallback, useState } from "react";
import { images } from "@/assets/images";

export const useDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const backgroundImage = useRef<HTMLImageElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>("#000000");
  const [isCanvasEmpty, setIsCanvasEmpty] = useState<boolean>(true);
  const isInitialized = useRef(false);

  const getEventPosition = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if (e instanceof MouseEvent) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    } else {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  };

  const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
    isDrawing.current = true;
    const { x, y } = getEventPosition(e);
    context.current?.beginPath();
    context.current?.moveTo(x, y);
  }, []);

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      const { x, y } = getEventPosition(e);
      if (context.current) {
        context.current.strokeStyle = color;
        context.current.lineTo(x, y);
        context.current.stroke();
        setIsCanvasEmpty(false);
      }
    },
    [color],
  );

  const endDrawing = useCallback(() => {
    isDrawing.current = false;
    context.current?.closePath();
  }, []);

  const exportImage = useCallback(() => {
    const sourceCanvas = canvasRef.current;
    if (!sourceCanvas) return null;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 1024;
    exportCanvas.height = 1024;

    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return null;

    exportCtx.drawImage(
      sourceCanvas,
      0,
      0,
      sourceCanvas.width,
      sourceCanvas.height,
      0,
      0,
      1024,
      1024,
    );

    return exportCanvas.toDataURL("image/png");
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && context.current) {
      context.current.clearRect(0, 0, canvas.width, canvas.height);
      setIsCanvasEmpty(true);
    }
  }, []);

  const drawBackground = () => {
    const canvas = canvasRef.current;
    const ctx = context.current;
    const img = backgroundImage.current;
    if (!canvas || !ctx || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!isInitialized.current) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      isInitialized.current = true;
    }

    // Save existing drawing
    const prevImage = canvas.toDataURL();

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      context.current = ctx;

      // Restore previous drawing
      const img = new Image();
      img.src = prevImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }

    const handleMouseDown = (e: MouseEvent) => startDrawing(e);
    const handleMouseMove = (e: MouseEvent) => draw(e);
    const handleMouseUp = () => endDrawing();

    const handleTouchStart = (e: TouchEvent) => startDrawing(e);
    const handleTouchMove = (e: TouchEvent) => draw(e);
    const handleTouchEnd = () => endDrawing();

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [color, draw, startDrawing, endDrawing]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const parent = canvas?.parentElement;

      if (!parent) return;

      // Calculate the smaller of the parent's width/height to maintain 1:1
      const size = Math.min(parent.clientWidth, parent.clientHeight);

      // Set canvas display size (CSS)
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      // Set canvas internal size (resolution)
      canvas.width = size;
      canvas.height = size;

      drawBackground();
    };

    resizeCanvas(); // Initial resize
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = images.guideline;
    img.onload = () => {
      backgroundImage.current = img;
      drawBackground(); // once image loads
    };
  }, []);

  return {
    canvasRef,
    exportImage,
    clearCanvas,
    color,
    setColor,
    isCanvasEmpty,
  };
};
