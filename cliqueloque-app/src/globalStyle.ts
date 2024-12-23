import { createGlobalStyle } from "styled-components";

export const colors = {
  bgColor: "#eff0e2",
  logoBgColor: "#0d455f",
};

export const GlobalStyles = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      font-family: "Roboto", sans-serif
  }

  html {
      min-height: 100vh;
  }

  body {
      height: 100vh;

      font-size: 1.6rem;
      background-color: ${colors.bgColor};
  }
`;
