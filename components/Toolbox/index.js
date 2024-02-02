"use client";

import { COLORS, MENU_ITEMS } from "@/constants";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeBrushSize, changeColor } from "@/redux/slice/toolboxSlice";
import cx from "classnames";

const Toolbox = () => {
  const dispatch = useDispatch();
  const { activeMenuItem } = useSelector((state) => state.menu);
  const { size, color: activeColor } = useSelector(
    (state) => state.toolbox[activeMenuItem]
  );
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  function updateBrushSize(e) {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  }

  function updateColor(newColor) {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  }

  return (
    <div className={styles.toolboxContainer}>
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              value={size}
            />
          </div>
        </div>
      )}
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
            />{" "}
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
            />{" "}
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
            />{" "}
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
            />{" "}
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: activeColor === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
            />{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
