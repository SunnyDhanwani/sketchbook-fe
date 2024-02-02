import { COLORS, MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  [MENU_ITEMS.PENCIL]: { color: COLORS.BLACK, size: 3 },
  [MENU_ITEMS.ERASER]: { color: COLORS.WHITE, size: 3 },
  [MENU_ITEMS.UNDO]: { disable: false },
  [MENU_ITEMS.REDO]: { disable: false },
  [MENU_ITEMS.DOWNLOAD]: { disable: false },
};

export const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action.payload.size;
    },
    disableOrEnableActionButton: (state, action) => {
      state[action.payload.item].disable = action.payload.disable;
    },
  },
});

export const { changeColor, changeBrushSize, disableOrEnableActionButton } =
  toolboxSlice.actions;

export default toolboxSlice.reducer;
