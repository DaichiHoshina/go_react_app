import "../styles/tailwind.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { SnackbarProvider } from "notistack";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

function MyApp({ Component, pageProps }: AppProps): any {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#4252B6",
      },
      secondary: {
        main: "#c2185b",
      },
      error: {
        main: "#7e7e7e",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        variant="error"
        autoHideDuration={3000}
      >
        <Provider store={store()}>
          <Component {...pageProps} />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
