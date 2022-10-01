import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;        
    }

    *:focus, *:active {
      -webkit-tap-highlight-color: transparent;
    }

    
`