import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): any {
  const router = useRouter();
  return (
    <Provider store={store()}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
