import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        white: "#fff",
        black: "#000",
        "light-gray": {
          "50": "#FEFEFE",
          "100": "#FCFCFC",
          "150": "#F9F9F9",
          "200": "#F7F7F7",
          "250": "#F4F4F4",
          "300": "#F6F8FA",
          "350": "#ECECEC",
          "400": "#EFEFEF",
          "450": "#F0F0F0",
          "475": "#F0F5FC",
          "500": "#F1F1F2",
          "550": "#E8E7E7",
          "600": "#E5E5E5",
          "650": "#E9E9E9",
          "700": "#E7E7E7",
        },
        "mid-gray": {
          "50": "#F0F2F5",
          "100": "#EEF0F2",
          "150": "#EBEBEB",
          "175": "#E6E6E6",
          "200": "#E1E1E1",
          "250": "#E3E3E3",
          "300": "#DEE0E5",
          "350": "#E1E3EA",
          "400": "#E2E4E9",
          "450": "#D0D5DD",
          "500": "#CDD0D5",
          "550": "#D2D2D2",
          "600": "#BFBFBF",
          "650": "#E4DBDB",
          "700": "#CBCBCB",
        },
        "dark-gray": {
          "50": "#89939E",
          "100": "#9E9E9E",
          "150": "#98A2B3",
          "175": "#9C9C9C",
          "200": "#868C98",
          "250": "#7E8299",
          "300": "#667185",
          "350": "#525866",
          "400": "#666666",
          "450": "#5A5A5A",
          "500": "#3F4254",
          "550": "#394356",
        },
        "deep-gray": {
          "50": "#8E8E8E",
          "100": "#645D5D",
          "150": "#393939",
          "200": "#323237",
          "225": "#303030",
          "250": "#202025",
          "300": "#1E1E1E",
          "350": "#1B1818",
          "400": "#15151A",
        },
        dark: {
          "100": "#1A1C21",
          "200": "#1a1a1a",
          "300": "#0F0F0F",
          "400": "#05050A",
          "500": "#101928",
        },
        "red-tone": {
          "100": "#DF1C41",
          "200": "#E71D36",
          "300": "#B34D2B",
          "400": "#F56630",
          "500": "#F17B2C",
          "600": "#EE6639",
        },
        "green-tone": {
          "100": "#E8FFF3",
          "200": "#E9F5E5",
          "300": "#F0F8EE",
          "350": "#D1EAC9",
          "375": "#CCE3E4",
          "400": "#CBF0DC",
          "500": "#6ABA51",
          "600": "#2E955D",
          "700": "#0F973D",
          "800": "#50CD89",
          "900": "#41D195",
          "1000": "#38C793",
        },
        "light-blue-tone": "#7dd3fc",
        "blue-tone": {
          "50": "#EBF1FF",
          "100": "#E7F1FF",
          "150": "#344054",
          "200": "#1F304C",
          "250": "#4A92FF",
          "300": "#3D89DF",
          "350": "#1671D9",
          "400": "#1868DB",
          "450": "#375DFB",
          "500": "#02031B",
        },
        gold: "#D4B172",
        "light-yellow": "#FFF5E4",
        yellow: "#F3A218",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90.22deg, #98F5C3 0%, #FFE08F 15.62%, #FC7051 32.81%, #F5AF98 47.33%, #FC7051 63.09%, #FFE08F 80.06%, #98F5C3 100%)",
        "purple-gradient": "linear-gradient(90deg, #D195D8 0%, #CFAC8E 100%)",
        "green-gradient":
          "linear-gradient(90.22deg, #666666 0%, #2E955D 95%, #38C793 100%)",
        "dark-gradient":
          "linear-gradient(360deg, rgba(0, 10, 40, 0) 0%, #000000 70%)",
        "light-gradient":
          "linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, #fff 40%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
