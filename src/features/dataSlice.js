import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const getTheme = () =>
  getLocalStorage("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

const initialState = {
  theme: getTheme(),
  activeBoard: getLocalStorage("active-board") || "Platform Launch",
  sideBarsOpen: getLocalStorage("sidebars-open") || "open",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    toggleSidebar: (state) => {
      state.sideBarsOpen = state.sideBarsOpen === "open" ? "close" : "open";
      localStorage.setItem("sidebars-open", JSON.stringify(state.sideBarsOpen));
    },

    toggleActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { toggleTheme, toggleActiveBoard, toggleSidebar } =
  dataSlice.actions;
