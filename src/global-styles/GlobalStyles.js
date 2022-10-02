import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 0;
        margin: 0;        
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    *:focus, *:active {
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: ${({ theme }) => theme.bodyBg};
      min-height: 100vh;
      width: 100vw;
    }


    button, input {
      border: none;
      outline: none;
    }

    button {
      cursor: pointer;
    }
`;
