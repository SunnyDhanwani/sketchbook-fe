"use client";

import { MENU_ITEMS } from "@/constants";
import menuSlice, { actionItemClick } from "@/redux/slice/menuSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDraw = useRef(null);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // set the ctx to draw beneath your current content

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      // https://www.mikechambers.com/blog/2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/0, 0, canvas.width, canvas.height);

      const URL = canvas.toDataURL("image/png", 1);
      const a = document.createElement("a");
      a.href = URL;
      a.download = "sketch.png";
      a.click();
      dispatch(actionItemClick(null));
    }
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeConfig();
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beingPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beingPath(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;

      drawLine(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
