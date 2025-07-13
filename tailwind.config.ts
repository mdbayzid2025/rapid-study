import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1300px",
      },
    },
    extend: {
      colors: {
        primary: "#0f67b1",
        secondary: "#03457c",        
        blue:"#3197d6" ,         
        black:"#333333" ,                         
      },
    },
  },
  plugins: [],
} satisfies Config;
