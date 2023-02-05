/* eslint-disable @next/next/no-img-element */
import Header from "@/components/home/header";
import Hero from "@/components/home/Hero";
import { circa } from "@/utils/fonts";

const Home = () => {
  return (
    <div
      className={`${circa} flex min-h-screen w-full flex-col items-center bg-black pt-40 text-center text-white`}
    >
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
