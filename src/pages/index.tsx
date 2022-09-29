import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/fonts/sequel-black.ttf" />
      </Head>
      <h1 className="w-full h-screen flex items-center justify-center text-8xl text-center text-[#ffffff] sequel-black tracking-wide">
        {/* Revolutionizing Payments <br /> on Solana */}
      </h1>
    </div>
  );
};

export default Home;
