import { configs } from "eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...configs["core-web-vitals"].rules,
    },
  },
];
