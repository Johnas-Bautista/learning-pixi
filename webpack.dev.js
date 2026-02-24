const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Helps you find errors in your original code
  devServer: {
    host: "0.0.0.0",
    static: "./dist",
    hot: true,
    port: 8080,
    liveReload: true,
    headers: {
      "Cache-Control": "no-store", // Tells browser: "Do not save this file"
      Pragma: "no-cache",
    },
    client: {
      overlay: true, // Shows errors   directly on the screen
    },
  },
});
