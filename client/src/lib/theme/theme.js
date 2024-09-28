import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00B074",
    },
    secondary: {
      main: "#232424",
    },
    text: {
      primary: "#464255",
      secondary: "#00000080",
    },
  },

  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "10px 52px",
          color: "white",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "700",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "9px",
        },
      },
    },
  },

  typography: {
    fontFamily: "Barlow, sans-serif",
    button: {
      textTransform: "none",
    },
    subtitle1: {
      color: "#00000080",
      fontSize: "18px",
    },
  },
});
