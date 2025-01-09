/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#282c34", // Fondo principal
        foreground: "#abb2bf", // Texto primario
        primary: "#61afef",    // Azul (resaltado)
        secondary: "#e06c75",  // Rojo
        accent: "#98c379",     // Verde
        muted: "#5c6370",      // Gris apagado
        border: "#3e4451",     // Bordes
        link: "#61afef",       // Enlaces
        warning: "#d19a66",    // Amarillo (alertas)
        error: "#be5046",      // Error (rojo más oscuro)
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
