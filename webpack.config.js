const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // entry point
  output: {
    filename: "[name].[contenthash].js", // output file name
    path: path.resolve(__dirname, "dist"), // output directory
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".css", ".html"], // file extensions to resolve
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@components": path.resolve(__dirname, "src/components"),
    }, // alias to resolve
  },
  module: {
    rules: [
      {
        test: /\.m?(ts|js)x?$/, // test for .ts, .tsx, .js, .jsx files
        exclude: /node_modules/, // exclude node_modules
        use: {
          loader: "babel-loader", // use babel-loader
        },
      },
      {
        test: /\.css$/, // test for .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new CleanWebpackPlugin(), // clean dist folder
    new HtmlWebpackPlugin({
      template: "./public/index.html", // template file
      filename: "index.html", // output file
      inject: "true", // inject into html
    }), // generate index.html
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }), // generate css file
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
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  }, // minify css and js
};
