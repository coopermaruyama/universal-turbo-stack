import base from "@acme/tailwind-config/postcss.config";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: { ...base.plugins, "postcss-font-magician": {} },
};

export default config;
