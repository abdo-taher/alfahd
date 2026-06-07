import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#1E293B",
          foreground: "#ffffff"
        },
        accent: {
          DEFAULT: "#F97316",
          foreground: "#ffffff"
        },
        muted: {
          DEFAULT: "#94A3B8"
        }
      },

      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        full: "9999px"
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 20px rgba(0,0,0,0.15)",
        xl: "0 20px 40px rgba(0,0,0,0.2)"
      },

      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
        "2xl": ["24px", "36px"],
        "3xl": ["30px", "40px"],
        "4xl": ["36px", "44px"]
      }
    }
  },
  plugins: []
} satisfies Config;
