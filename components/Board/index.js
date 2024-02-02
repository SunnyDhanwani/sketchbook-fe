"use client";

import { MENU_ITEMS } from "@/constants";
import menuSlice, { actionItemClick } from "@/redux/slice/menuSlice";
import { disableOrEnableActionButton } from "@/redux/slice/toolboxSlice";
import { socket } from "@/socket";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      // https://www.mikechambers.com/blog/2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/0, 0, canvas.width, canvas.height);

      const URL = canvas.toDataURL("image/png", 1);
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.png";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (actionMenuItem === MENU_ITEMS.UNDO) {
        if (historyPointer.current >= 0) {
          historyPointer.current -= 1;
        }
      } else if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      ) {
        historyPointer.current += 1;
      }

      if (historyPointer.current < 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        const imageData = drawHistory.current[historyPointer.current];
        context.putImageData(imageData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = ({ color, size }) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeConfig({ color, size });

    socket.on("changeConfig", changeConfig);

    return () => {
      socket.off("changeConfig", changeConfig);
    };
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

      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;

      drawLine(e.clientX, e.clientY);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const handleBeginPath = ({ x, y }) => {
      beingPath(x, y);
    };

    const handleDrawLine = ({ x, y }) => {
      drawLine(x, y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
