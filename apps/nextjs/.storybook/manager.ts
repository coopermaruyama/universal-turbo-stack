import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

addons.setConfig({
  theme: themes.dark,
  panelPosition: "bottom",
  sidebar: {
    showRoots: false,
    collapsedRoots: ["other"],
  },
});
