const theme = {
  colors: {
    primary: '#004f81',
    primaryDark: '#023854',
    secondary: '#005a64',
    secondaryLight: '#005d83',
    accent: '#008136',
    success: '#27ae60',
    successLight: '#2ecc71',
    error: '#d91b5b',
    errorDark: '#e74c3c',
    warning: '#f39c12',
    warningDark: '##FF8600',
    info: '#3498db',
    infoDark: '#2980b9',
    blue: '#3969b1',
    white: '#ffffff',
    black: '#000000',
    lightGray: '#efefef',
    mediumGray: '#ccc',
    darkGray: '#666',
    shadow: 'rgba(0, 0, 0, 0.75)',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  fonts: {
    primary: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    code: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    weights: {
      light: 300,
      regular: 400,
      bold: 700,
      extraBold: 800
    }
  },
  fontSizes: {
    base: '10px',
    small: '1.1em',
    regular: '1.2em',
    medium: '1.3em',
    large: '1.6em',
    xlarge: '2.6em',
    xxlarge: '2.8em',
    huge: '4em'
  },
  spacing: {
    xsmall: '5px',
    small: '8px',
    medium: '16px',
    large: '20px',
    xlarge: '30px',
    xxlarge: '60px'
  },
  shadows: {
    small: '5px 5px 10px #00000065',
    medium: '10px 10px 20px -11px rgba(0,0,0,0.75)',
    large: '-1px 8px 11px -3px rgba(0,0,0,0.75)'
  },
  breakpoints: {
    mobileS: `(min-width: 320px)`,
    mobileM: `(min-width: 375px)`,
    mobileL: `(min-width: 425px)`,
    tablet: `(min-width: 768px)`,
    desktop: `(min-width: 1024px)`,
    fullHd: `(min-width: 1920px)`,
  },
} as const;

export type Theme = typeof theme;
export default theme;
