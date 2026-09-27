import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 e o padrao; 92 pros prints de sistema, que tem texto pequeno e borram
    // com compressao forte.
    qualities: [75, 92],
  },
};

export default nextConfig;
