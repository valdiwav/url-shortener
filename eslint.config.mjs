import { configs } from "eslint-plugin-next";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Archivos a los que se aplica
    ...configs["core-web-vitals"], // Configuración de Next.js para Core Web Vitals
  },
];
