/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    "removeConsole": {
      "exclude": ["error", "warn"]
    },
  },
  // pageExtensions: ["tsx, mts, md, mdx, js, jsx, ts"],
};

export default nextConfig;
