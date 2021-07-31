const path = require("path");
const rootPath = path.resolve(__dirname, "../");
const workspaceRoot = require("find-yarn-workspace-root");
const dotenv = require("dotenv");
dotenv.config({ path: `${workspaceRoot()}/.env` });

const {
  VUE_APP_SCREEN_MM,
  VUE_APP_SCREEN_ML,
  VUE_APP_SCREEN_TV,
  VUE_APP_SCREEN_TW,
  VUE_APP_SCREEN_DS,
  VUE_APP_SCREEN_DM,
  VUE_APP_SCREEN_DL,
} = process.env;

module.exports = {
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.mdx",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    // less loader
    config.module.rules.push({
      test: /.*\.less$/,
      use: [
        "vue-style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            globalVars: {
              "@SCREEN_MM": VUE_APP_SCREEN_MM,
              "@SCREEN_ML": VUE_APP_SCREEN_ML,
              "@SCREEN_TV": VUE_APP_SCREEN_TV,
              "@SCREEN_TW": VUE_APP_SCREEN_TW,
              "@SCREEN_DS": VUE_APP_SCREEN_DS,
              "@SCREEN_DM": VUE_APP_SCREEN_DM,
              "@SCREEN_DL": VUE_APP_SCREEN_DL,
            },
            data: `@import "~@/less/common.less"`,
          },
        },
      ],
    });
    config.resolve.alias["@"] = rootPath;
    return config;
  },
};
