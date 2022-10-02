import React, { Fragment, useEffect } from "react";
import { dark, light } from "../../global-styles/theme";

import { ThemeProvider } from "styled-components";
import { selectTheme } from "../../features/dataSlice";
import { useSelector } from "react-redux";

const savedToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const Wrapper = ({ children }) => {
  const state = useSelector((state) => state);
  const { data, boardTabs } = state;
  const { theme, activeBoard, sideBarsOpen } = data;

  // useEffect(() => {

  // }, [JSON.stringify(boardTabs)]);

  useEffect(() => {
    savedToLocalStorage("active-board", activeBoard);
    savedToLocalStorage("theme", theme);
    savedToLocalStorage("sidebars-open", sideBarsOpen);
  }, [theme, activeBoard, sideBarsOpen]);

  return (
    <Fragment>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        {children}
      </ThemeProvider>
    </Fragment>
  );
};

export default Wrapper;
