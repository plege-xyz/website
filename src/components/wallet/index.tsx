import dynamic from "next/dynamic";

export const DynamicWallet = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Wallet = () => {
  return (
    <DynamicWallet
      style={{
        background: "white",
        color: "black",
      }}
    />
  );
};

export default Wallet;
