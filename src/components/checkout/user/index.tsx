import { useWallet } from "@solana/wallet-adapter-react";
import Balance from "./balance";
import Login from "./Login";

const User = () => {
  const { publicKey } = useWallet();

  return (
    <div className="w-full h-full bg-[#f7f7f7] dark:bg-[rgb(20,20,20)] text-black dark:text-white flex items-center justify-center">
      {!publicKey ? <Login /> : <Balance />}
    </div>
  );
};

export default User;
