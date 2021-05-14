import "../styles/tailwind.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps): any {
  return (
    <SnackbarProvider>
      <Provider store={store()}>
        <Component {...pageProps} />
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;
