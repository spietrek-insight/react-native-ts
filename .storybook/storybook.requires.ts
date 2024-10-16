/* do not change this file, it is auto generated by storybook. */

import { start } from "@storybook/react-native";

import "@storybook/addon-links/register";
import "@storybook/addon-a11y/register";
import "@storybook/addon-essentials/register";
import "@storybook/addon-react-native-web/register";

const normalizedStories = [
  {
    titlePrefix: "",
    directory: "./src/components",
    files: "**/*.stories.mdx",
    importPathMatcher:
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.mdx)$/,
    // @ts-ignore
    req: require.context(
      "../src/components",
      true,
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.mdx)$/
    ),
  },
  {
    titlePrefix: "",
    directory: "./src/components",
    files: "**/*.stories.@(js|jsx|ts|tsx)",
    importPathMatcher:
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/,
    // @ts-ignore
    req: require.context(
      "../src/components",
      true,
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/
    ),
  },
];

// @ts-ignore
global.STORIES = normalizedStories;

export const view = start({
  annotations: [
    require("./preview"),
    require("@storybook/react-native/dist/preview"),
  ],
  storyEntries: normalizedStories,
});
