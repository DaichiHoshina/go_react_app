import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
// import "../styles/globals.css";
// import "../styles/styles.scss";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): any {
  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement?.removeChild(jssStyles);
  //   }
  // }, []);

  const router = useRouter();
  useEffect(() => {
    if (
      !!Object.keys(router.query).length &&
      router.query.medicalId != undefined &&
      router.query.medicalId != null &&
      router.query.medicalId != ""
    ) {
      // TODO: 共通state管理すべき
      localStorage.setItem("medicalId", router.query.medicalId + "");
    }
  }, [router.query]);

  return (
    <Provider store={store()}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
