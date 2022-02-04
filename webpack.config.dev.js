const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.tsx",
  devtool: "eval-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".css", ".html"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.m?js$/, // test for .js files
        enforce: "pre", // enforce the loader
        exclude: /node_modules/, // exclude node_modules
        use: ["source-map-loader"], // use source-map-loader
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // use css-loader
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // test for .png, .svg, .jpg, .gif files
        type: "asset/resource", // type of file
        generator: {
          filename: "assets/images/[hash][ext][query]", // output file name
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // test for .woff, .woff2, .eot, .ttf, .otf files
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash].[ext]", // output file name
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: path.resolve(__dirname, "dist", "assets/images"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    historyApiFallback: true,
    port: 9000,
  },
};
