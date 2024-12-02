/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "primary-black": "#282A2D",
        "primary-grey": {
          700: "#696D74",
          100: "#9DA1A6",
        },
        "primary-red": "#F70404",
        "primary-green": {
          dark: "#174141",
          text: "#3D6005",
          light: "#AED76F",
          100: "#EBF9D4",
          200: "#EAFBCF",
        },
        "secondary-white": "#F4F4F4",
        "fifth-white": "#F7F7F7",
        "third-white": "#D9D9D9",
        "fourth-white": "#f0f0f0",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
          10: "10px",
          6: "6px",
          8: "8px",
          20: "20px",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        boxShadow: {
          "login-card-shadow":
            " 71px 197px 59px 0px rgba(180, 191, 95, 0.00), 46px 126px 54px 0px rgba(180, 191, 95, 0.01), 26px 71px 45px 0px rgba(180, 191, 95, 0.05), 11px 31px 33px 0px rgba(180, 191, 95, 0.09), 3px 8px 18px 0px rgba(180, 191, 95, 0.10)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
