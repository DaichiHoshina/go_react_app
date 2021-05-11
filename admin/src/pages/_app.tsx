import "../styles/tailwind.css";
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
      <div className="min-h-screen flex justify-center items-center">
        Weather Application
      </div>
      ;
    </Provider>
  );
}

export default MyApp;
