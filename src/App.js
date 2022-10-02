import BoardBody from "./components/BoardBody/BoardBody";
import { GlobalStyle } from "./global-styles/GlobalStyles";
import Modals from "./components/Modals/Modals";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import SideBar from "./components/SideBar/SideBar";
import Wrapper from "./components/Wrapper/Wrapper";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
        <SideBar />
        <BoardBody />
        <Modals />
      <Navbar />
    </Wrapper>
  );
}

export default App;
