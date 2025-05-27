import "expo-router/entry";
import { checkStorybookEnabled } from "~/lib/storybook";

let Default = () => null;
if (checkStorybookEnabled()) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access
  Default = require("./.storybook").default as typeof Default;
}

export default Default;
