import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://summer-light-dew.solana-devnet.discover.quiknode.pro/24fe6713fe1012af12aa16b58d3e4d9f95f7dec5/"
);
const programId = new PublicKey("7xMy6CDMk3ANhRBEMorr9A3EJt5qWcQq64MeqGdC9JpA");
const USDC_MINT = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
export { connection, programId, USDC_MINT };
