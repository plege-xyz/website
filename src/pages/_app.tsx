import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { Provider } from "@/components/wallet/Provider";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import { overpass } from "@/utils/fonts";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Head>
        <title>Plege</title>
      </Head>
      <Toaster containerClassName={`${overpass}`} />
      <Component {...pageProps} />
    </Provider>
  );
};

export default trpc.withTRPC(MyApp);
