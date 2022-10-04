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

    input:focus, textarea:focus {
      border-color: ${({theme}) => theme.blue};
    }

    button, svg {
      cursor: pointer;
    }

    button {
      transition: 1s ease;
      transition-property: color, background-color, opacity;
    }

    ::-webkit-scrollbar {
      width: 10px;
      height: 10%;
      background: ${({theme}) => theme.bodyBg};
    }
    ::-webkit-scrollbar-track {
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 5px;
      background: ${({theme}) => theme.scrollBg};
    }


    .column-1 {
      background-color: #49C4E5; 
    }

    .column-2 {
      background-color: #8471F2; 
    }


    .column-3 {
      background-color: #67E2AE; 
    }


    .column-4 {
      background-color: #e5a449; 
    }


    .column-5 {
      background-color: #2a3fdb; 
    }

    .column-6 {
      background-color: #c36e6e; 
    }
`;
