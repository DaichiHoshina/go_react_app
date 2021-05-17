import "../styles/tailwind.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { SnackbarProvider } from "notistack";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps): any {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#4252B6",
      },
      secondary: {
        main: "#c2185b",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <Provider store={store()}>
          <Component {...pageProps} />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
