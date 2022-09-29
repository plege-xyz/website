import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const app = await prisma.app.create({
    data: {
      apiKey: "cl8afh1890009zsil2reyzr3g",
      name: "Plege",
    },
  });

  const user = await prisma.user.create({
    data: {
      publicKey: "ByPWcGiGauAqNixGi9vnuCwMLSwBzV1heLrn6M3EnM1t",
    },
  });

  const token = await prisma.token.create({
    data: {
      network: "DEVNET",
      mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
      decimals: 6,
      symbol: "USDC",
      name: "USDC-Dev",
      image:
        "https://cdn.jsdelivr.net/gh/solana-labs/token-list/main/assets/mainnet/USDC.png",
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "Helius",
      price: 5,
      tokenId: token.id,
      appId: app.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
