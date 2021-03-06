const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/scripts/index.ts",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
  },
  output: {
    path: path.resolve(__dirname, "./static"),
    filename: "scripts/[name].[chunkhash].js",
  },
  plugins: [
    new AssetsPlugin({
      path: path.join(__dirname, "./data"),
      fullPath: false,
      filename: "webpack_assets.json",
      prettyPrint: true,
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, "./static"),
      filename: "styles/[name].[chunkhash].css",
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
