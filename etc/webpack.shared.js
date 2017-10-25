const path = require("path");
const ExtractText = require("extract-text-webpack-plugin");

const babelOptions = {
  presets: ["react", ["es2015", { modules: false, loose: true }], "stage-2"],
  plugins: ["relay"],
};

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "../src/client/index.js"),
    vendor: ["react", "react-dom", "normalize.css"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      client: path.resolve(__dirname, "../src/client"),
      graphql: path.resolve(__dirname, "../src/graphql"),
      server: path.resolve(__dirname, "../src/server"),
    },
  },
  jsClient: {
    test: /\.jsx?$/,
    use: [
      {
        loader: "babel-loader",
        options: babelOptions,
      },
    ],
  },
  cssShared: {
    test: /\.css$/,
    use: ExtractText.extract({
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
        },
      ],
    }),
  },
};
