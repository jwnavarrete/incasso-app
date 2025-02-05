"use client";

import { createTheme, alpha, PaletteMode, Shadows } from "@mui/material/styles";

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  // interface PaletteColor extends ColorRange {
  //   // Add members if needed in the future
  // }

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const brand = {
  50: "hsl(30, 100%, 97%)",
  100: "hsl(30, 100%, 92%)",
  200: "hsl(30, 95%, 83%)",
  300: "hsl(30, 92%, 72%)",
  400: "hsl(30, 89%, 61%)",
  500: "hsl(30, 87%, 54%)",
  600: "hsl(30, 82%, 48%)",
  700: "hsl(30, 79%, 40%)",
  800: "hsl(30, 72%, 34%)",
  900: "hsl(30, 67%, 27%)",
  950: "hsl(30, 67%, 15%)",
};

export const secondary = {
  50: "hsl(220, 20%, 96%)",
  100: "hsl(220, 20%, 92%)",
  200: "hsl(220, 20%, 85%)",
  300: "hsl(220, 20%, 75%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 55%)",
  600: "hsl(220, 20%, 45%)",
  700: "hsl(220, 20%, 35%)",
  800: "hsl(220, 20%, 30%)",
  900: "hsl(220, 20%, 25%)",
  950: "hsl(220, 20%, 15%)",
};

export const blue = {
  50: "hsl(180, 100%, 97%)",
  100: "hsl(180, 100%, 93%)",
  200: "hsl(180, 100%, 85%)",
  300: "hsl(180, 95%, 75%)",
  400: "hsl(180, 90%, 65%)",
  500: "hsl(180, 100%, 50%)",
  600: "hsl(180, 95%, 45%)",
  700: "hsl(180, 85%, 40%)",
  800: "hsl(180, 75%, 35%)",
  900: "hsl(180, 65%, 30%)",
  950: "hsl(180, 50%, 20%)",
};

export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

export const green = {
  50: "hsl(134, 100%, 95%)",
  100: "hsl(134, 85%, 90%)",
  200: "hsl(134, 75%, 80%)",
  300: "hsl(134, 70%, 70%)",
  400: "hsl(134, 65%, 60%)",
  500: "hsl(134, 60%, 50%)",
  600: "hsl(134, 55%, 40%)",
  700: "hsl(134, 50%, 35%)",
  800: "hsl(134, 45%, 30%)",
  900: "hsl(134, 40%, 25%)",
  950: "hsl(134, 30%, 15%)",
};

export const orange = {
  50: "hsl(50, 100%, 95%)",
  100: "hsl(50, 100%, 85%)",
  200: "hsl(50, 100%, 70%)",
  300: "hsl(50, 100%, 60%)",
  400: "hsl(50, 100%, 50%)",
  500: "hsl(50, 100%, 40%)",
  600: "hsl(50, 100%, 35%)",
  700: "hsl(50, 100%, 30%)",
  800: "hsl(50, 100%, 25%)",
  900: "hsl(50, 100%, 20%)",
  950: "hsl(50, 100%, 10%)",
};

export const red = {
  50: "hsl(15, 100%, 95%)",
  100: "hsl(15, 100%, 90%)",
  200: "hsl(15, 100%, 80%)",
  300: "hsl(15, 100%, 70%)",
  400: "hsl(15, 100%, 60%)",
  500: "hsl(15, 100%, 50%)",
  600: "hsl(15, 100%, 40%)",
  700: "hsl(15, 100%, 30%)",
  800: "hsl(15, 100%, 20%)",
  900: "hsl(15, 100%, 10%)",
  950: "hsl(15, 100%, 5%)",
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      secondary: {
        light: secondary[100],
        main: secondary[300],
        dark: secondary[600],
        contrastText: secondary[50],
      },
      info: {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      },
      warning: {
        contrastText: orange[900],
        light: orange[300],
        main: orange[400],
        dark: orange[500],
      },
      error: {
        contrastText: gray[50],
        light: red[300],
        main: red[400],
        dark: red[500],
      },
      success: {
        contrastText: gray[50],
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: "hsl(0, 0%, 99%)",
        paper: "hsl(220, 35%, 97%)",
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[700],
      },
      info: {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: gray[900],
        paper: "hsl(220, 30%, 7%)",
      },
      text: {
        primary: "hsl(0, 0%, 100%)",
        secondary: gray[400],
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: alpha(gray[600], 0.3),
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
    },
  },
};

export const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

// @ts-expect-error: Shadows type is being overridden for custom shadows
const defaultShadows: Shadows = [
  "none",
  "var(--template-palette-baseShadow)",
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;
