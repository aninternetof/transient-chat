const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public/static"),
  },
};
