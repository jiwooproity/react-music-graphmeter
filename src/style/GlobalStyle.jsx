import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    ::-webkit-scrollbar {
        display: none
    }
`;

export default GlobalStyle;
