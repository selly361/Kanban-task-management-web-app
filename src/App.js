import { GlobalStyle } from "./global-styles/GlobalStyles";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import SideBar from "./components/SideBar/SideBar";
import Wrapper from "./components/Wrapper/Wrapper";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
        <SideBar />
        <Navbar />
    </Wrapper>
  );
}

export default App;
