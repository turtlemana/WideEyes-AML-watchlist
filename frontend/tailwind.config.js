/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        1320: "82.5rem",
        406: "406px",
      },
      maxWidth: {
        1320: "82.5rem",
      },
      borderRadius: {
        20: "20px",
      },
      screens: {
        laptop: { min: "0", max: "1024px" },
        desktop: { min: "1024px", max: "1320px" },
      },
      backgroundImage: {
        backgroundColor:
          "linear-gradient(88.83deg, rgba(1, 72, 255, 0.4) 11.32%, rgba(1, 152, 255, 0) 80.03%)",
          backgroundWideEyes: "url('../assets/images/wide_eyes/bg.png')",
          backgroundWideEyesMobile:
            "url('../assets/images/wide_eyes/bgMobile.png')",
          backgroundButton:
            "linear-gradient(0deg, #FCFCFF 72.38%, rgba(252, 252, 255, 0) 89.67%)",
      },
      colors: {
        "blue-rgba": "rgba(1, 152, 255, 0.05)",
        "gray-rgba": "rgba(17, 17, 17, 0.5);",
        "light-gray-rgba": "rgba(0, 0, 0, 0.2)",
      },
      translate: {
        half: "-50%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
