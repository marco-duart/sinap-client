import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        primary: "#08CFCC",
        primaryDark: "#049E9B",
        primaryLight: "#5DE8E6",

        secondary: "#002936",
        secondaryDark: "#001A22",
        secondaryLight: "#1B4A5A",

        accent: "#00BFA6",
        accentLight: "#4EF0DB",
        accentDark: "#009B85",

        success: "#2ecc71",
        successLight: "#58d68d",
        successDark: "#27ae60",

        error: "#d91b5b",
        errorLight: "#f36a9b",
        errorDark: "#b9154a",

        warning: "#f39c12",
        warningLight: "#f7b84a",
        warningDark: "#d68910",

        info: "#3498db",
        infoLight: "#5dade2",
        infoDark: "#2e86c1",

        blue: "#3969b1",
        white: "#ffffff",
        black: "#000000",

        lightGray: "#f4f4f4",
        mediumGray: "#ccc",
        darkGray: "#555",

        shadow: "rgba(0, 0, 0, 0.75)",
        overlay: "rgba(0, 0, 0, 0.5)",
      },

      fonts: {
        primary:
          '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        code: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },

      fontWeights: {
        light: 300,
        regular: 400,
        bold: 700,
        extraBold: 800,
      },

      fontSizes: {
        base: "10px",
        small: "1.1em",
        regular: "1.2em",
        medium: "1.3em",
        large: "1.6em",
        xlarge: "2.6em",
        xxlarge: "2.8em",
        huge: "4em",
      },

      space: {
        xsmall: "5px",
        small: "8px",
        medium: "16px",
        large: "20px",
        xlarge: "30px",
        xxlarge: "60px",
      },

      shadows: {
        small: "5px 5px 10px #00000065",
        medium: "10px 10px 20px -11px rgba(0,0,0,0.75)",
        large: "-1px 8px 11px -3px rgba(0,0,0,0.75)",
      },

      breakpoints: {
        mobileS: "(min-width: 320px)",
        mobileM: "(min-width: 375px)",
        mobileL: "(min-width: 425px)",
        tablet: "(min-width: 768px)",
        desktop: "(min-width: 1024px)",
        fullHd: "(min-width: 1920px)",
      },
    },
  });

export type Theme = typeof config.theme;
