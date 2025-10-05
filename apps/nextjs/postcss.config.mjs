import base from "@acme/tailwind-config/postcss.config";

const config = {
  plugins: {
    ...base.plugins,
    "@tailwindcss/postcss": {},
  },
};

export default config;
