import { useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import { default as Nav } from "./app/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [url, setUrl] = useState(router.pathname);
  console.log(url);

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-black text-white">
      <Header />
      {router.pathname !== "/dashboard/login" &&
        router.pathname !== "/dashboard" && <Nav url={url} />}
      <div className="w-full flex-grow bg-black">{children}</div>
    </div>
  );
};

export default Layout;
