import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pt-root-ui': ['var(--font-pt-root-ui)', 'sans-serif'],
        'pt-root-ui-reg': ['var(--font-pt-root-ui-reg)', 'sans-serif'],
        'bebas-neue': ['var(--font-bebas-neue)', 'cursive'],
        'bebas-neue-cyr': ['var(--font-bebas-neue-cyr)', 'cursive'],
        'rubik': ['var(--font-rubik)', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        alert: 'var(--alert-color)',
        accent: 'var(--accent-color)',
      },
      rotate: { 
        '18': '18deg', '-18': '-18deg' 
      },
    },
  },
  plugins: [],
};
export default config;
