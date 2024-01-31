import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/redux/slice/menuSlice";
import ToolboxReducer from "@/redux/slice/toolboxSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolboxReducer,
  },
});
