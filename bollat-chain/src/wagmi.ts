import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createPublicClient, http } from "viem";

const { chains, publicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === "development" ? [goerli] : [])],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: false,
  publicClient,
});
