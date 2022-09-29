// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/wallet.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "@/utils/trpc";
import WalletProvider from "@/components/wallet/Provider";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WalletProvider>
      <div className="shapiro">
        <Toaster />
      </div>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default trpc.withTRPC(MyApp);
