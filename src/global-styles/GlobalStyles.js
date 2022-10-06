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

    button:disabled{
      opacity: 0.3;
    cursor: not-allowed;
    }

    input:disabled  {
      opacity: 0.3;
      
    }

    input:focus, textarea:focus {
      border-color: ${({ theme }) => theme.blue};
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
      background: ${({ theme }) => theme.bodyBg};
    }
    ::-webkit-scrollbar-track {
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 5px;
      background: ${({ theme }) => theme.scrollBg};
    }


    .color-1 {
      background-color: #49C4E5; 
    }

    .color-2 {
      background-color: #8471F2; 
    }


    .color-3 {
      background-color: #67E2AE; 
    }


    .color-4 {
      background-color: #e5a449; 
    }


    .color-5 {
      background-color: #2a3fdb; 
    }

    .color-6 {
      background-color: #c36e6e; 
    }

    .selector-1 {
      border-bottom: 1px solid #49C4E5;
    }
  .selector-2 {
    border-bottom: 1px solid #8471F2;
  
}
.selector-3 {
  border-bottom: 1px solid #67E2AE;

}
.selector-4 {
  border-bottom: 1px solid #e5a449;

}
.selector-5 {
  border-bottom: 1px solid #2a3fdb;

}
.selector-6 {
  border-bottom: 1px solid #c36e6e;

}


    @media (min-width: 1400px){
      * {
        font-size: 18px;
      }
    }
`;
