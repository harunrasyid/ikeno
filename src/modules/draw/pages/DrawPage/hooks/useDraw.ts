import { useRef, useEffect, useCallback, useState } from "react";

export const useDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#000000");
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
      }
    },
    [color],
  );

  const endDrawing = useCallback(() => {
    isDrawing.current = false;
    context.current?.closePath();
  }, []);

  const exportImage = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.toDataURL("image/png");
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && context.current) {
      context.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

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

  return {
    canvasRef,
    exportImage,
    clearCanvas,
    color,
    setColor,
  };
};
