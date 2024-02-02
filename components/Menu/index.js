"use client";

import {
  faDownload,
  faEraser,
  faPencil,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick, menuItemClick } from "@/redux/slice/menuSlice";
import { MENU_ITEMS } from "@/constants";
import cx from "classnames";

const Menu = () => {
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { UNDO, REDO, DOWNLOAD } = useSelector((state) => state.toolbox);

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  return (
    <div className={styles.menuContainer}>
      {/* Icon Wrapper */}
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, { [styles.disable]: UNDO.disable })}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faUndo} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, { [styles.disable]: REDO.disable })}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.disable]: DOWNLOAD.disable,
        })}
        onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faDownload} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
