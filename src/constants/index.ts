import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const connection = new Connection(
  "https://light-chaotic-night.solana-devnet.discover.quiknode.pro/a700b93c57df2ec6cc1906040681059ded04f297/",
  "confirmed"
);

export { endpoint, connection };
