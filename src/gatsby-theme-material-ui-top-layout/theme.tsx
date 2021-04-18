import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { pipe } from "fp-ts/lib/function"

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    constants: {
      desktopHeaderHeight: number
      mobileHeaderHeight: number
    }
  }

  interface ThemeOptions {
    constants: {
      desktopHeaderHeight: number
      mobileHeaderHeight: number
    }
  }
}

const palette = {
  primary: {
    main: "#074d4d",
  },
  secondary: {
    main: "#f0c37f",
    light: "#faf1e4",
  },
  text: {
    primary: "#000",
    secondary: "#FFF",
  },
}

const theme = pipe(
  createMuiTheme({
    constants: {
      desktopHeaderHeight: 110,
      mobileHeaderHeight: 120,
    },
    palette,
    typography: {
      fontFamily: ["Auxilia", "Arial", "sans-serif"].join(","),
      h1: {
        fontFamily: "AuxiliaBlack",
        letterSpacing: 0.55,
        fontSize: 45,
        lineHeight: 1.5,
      },
      h2: {
        fontFamily: "AuxiliaBold",
        letterSpacing: 0.4,
        fontSize: 36,
        lineHeight: 1.5,
      },
      h3: {
        fontFamily: "AuxiliaBold",
        letterSpacing: 0.3,
        fontSize: 26,
        lineHeight: 1.5,
        "@media (max-width:600px)": {
          fontSize: "23px !important",
        },
      },
      h4: {
        fontFamily: "AuxiliaBlack",
        textTransform: "uppercase",
        letterSpacing: 1,
        fontSize: 16,
      },
      h5: {
        fontFamily: "AuxiliaBold",
        letterSpacing: 0,
        fontSize: 18,
      },
      h6: {
        fontFamily: "AuxiliaBold",
        letterSpacing: 0,
        fontSize: 13,
      },
      body1: {
        fontFamily: "Auxilia",
        letterSpacing: 0.22,
        fontSize: 18,
        lineHeight: 1.7,
      },
    },
    overrides: {
      MuiDialog: {
        root: { zIndex: "1400 !important" } as any,
      },
      MuiDrawer: {
        paperAnchorRight: {
          width: "100%",
          backgroundColor: palette.primary.main,
          color: "#FFF",
        },
      },
      MuiButton: {
        root: {
          outline: "none !important",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      MuiButtonBase: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      MuiIconButton: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      MuiTypography: {
        root: {
          outline: "none",
        },
      },
      MuiAppBar: {
        root: {
          boxShadow: "none",
        },
      },
      MuiAccordion: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          "&::before": {
            content: "none",
          },
        },
        rounded: {
          "&:first-child": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          "&:last-child": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
      MuiAccordionSummary: {
        root: {
          padding: 0,
          justifyContent: "flex-start",
        },
        content: {
          flexGrow: 0,
        },
      },
      MuiSnackbar: {
        root: {
          width: "100%",
          maxWidth: "calc(100vw - 16px)",
        },
      },
    },
  }),
  responsiveFontSizes
)

export default theme
