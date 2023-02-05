import { useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import { default as Nav } from "./app/Header";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Wallet from "../wallet";
import { overpass } from "@/utils/fonts";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [url, setUrl] = useState(router.pathname);

  const wallet = useAnchorWallet();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-grow flex-col bg-black text-white">
      {/* <div
        className={`flex h-12 w-full items-center justify-center bg-white text-black ${overpass} pt-0.5`}
      >
        WELCOME TO PLEGE&apos;S PRIVATE BETA!
      </div> */}
      <Header />
      {router.pathname !== "/dashboard/login" &&
        router.pathname !== "/dashboard" && <Nav url={url} />}
      <div className="flex w-full flex-grow flex-col">
        {wallet ? (
          <div className="flex flex-grow flex-col">
            <div className="hidden lg:block">{children}</div>
            <div
              className={`flex h-full flex-grow items-center justify-center text-xl lg:hidden ${overpass}`}
            >
              VIEW ON DESKTOP
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-grow items-center justify-center">
            <Wallet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
