const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const workspaceRoot = require("find-yarn-workspace-root");
const dotenv = require("dotenv");
dotenv.config({ path: `${workspaceRoot()}/.env` });

const TARGET_NODE = process.env.WEBPACK_TARGET === "node";

const {
  VUE_APP_SCREEN_MM,
  VUE_APP_SCREEN_ML,
  VUE_APP_SCREEN_TP,
  VUE_APP_SCREEN_TL,
  VUE_APP_SCREEN_DS,
  VUE_APP_SCREEN_DM,
  VUE_APP_SCREEN_DL,
} = process.env;

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        additionalData: `
          @SCREEN_MM: ${VUE_APP_SCREEN_MM};
          @SCREEN_ML: ${VUE_APP_SCREEN_ML};
          @SCREEN_TP: ${VUE_APP_SCREEN_TP};
          @SCREEN_TL: ${VUE_APP_SCREEN_TL};
          @SCREEN_DS: ${VUE_APP_SCREEN_DS};
          @SCREEN_DM: ${VUE_APP_SCREEN_DM};
          @SCREEN_DL: ${VUE_APP_SCREEN_DL};
        `,
      },
    },
  },
  configureWebpack: TARGET_NODE
    ? {
        entry: "./src/entry-server.js",
        devtool: "source-map",
        target: "node",
        output: { libraryTarget: "commonjs2" },
        externals: nodeExternals({ allowlist: /\.css$/ }),
        plugins: [
          new VueSSRServerPlugin(),
          new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
          new webpack.DefinePlugin({ TARGET_NODE }),
        ],
      }
    : {
        entry: "./src/entry-client.js",
        devtool: "source-map",
        target: "web",
        node: false,
        plugins: [
          new VueSSRClientPlugin(),
          new webpack.DefinePlugin({ TARGET_NODE }),
        ],
      },
};
