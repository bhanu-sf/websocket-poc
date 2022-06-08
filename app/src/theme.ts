import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#337ab7",
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
  status: {
    danger: orange[500],
  },
});
