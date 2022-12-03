import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { Provider } from "@/components/wallet/Provider";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import { overpass } from "@/utils/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Toaster containerClassName={`${overpass}`} />
      <Component {...pageProps} />
    </Provider>
  );
};

export default trpc.withTRPC(MyApp);
