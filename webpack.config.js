const path = require("path");
const package = require("./package");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: `umd/web3-contract.${package.version}.js`,
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "web3Contract",
      type: "umd",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }],
  },
  externals: {
    ethers: {
      root: "ethers",
      commonjs2: "ethers",
      commonjs: "ethers",
      amd: "ethers",
      umd: "ethers",
    },
  },
  // plugins: [new BundleAnalyzerPlugin()],
};
