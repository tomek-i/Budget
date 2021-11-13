const path = require("path");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
  ],
  //presets: [path.resolve(__dirname, "./next-preset.js")],
};

// module.exports = {
//   stories: [
//     "../stories/**/*.stories.mdx",
//     "../stories/**/*.stories.@(js|jsx|ts|tsx)",
//   ],
//   addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
//   webpackFinal: async (config, { configType }) => {
//     config.module.rules.push({
//       test: /\.css$/,
//       use: [
//         {
//           loader: "postcss-loader",
//         },
//       ],
//       include: path.resolve(__dirname, "../"),
//     });
//     return config;
//   },
// };
