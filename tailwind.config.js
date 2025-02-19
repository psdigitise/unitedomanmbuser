/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },

      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        AvantGardeNormal: ["AvantGarde Normal", "sans-serif"],
        AvantGarde: ["Avant Garde", "sans-serif"],
        HenriDidot: ["Henri Didot", "sans-serif"],
      },

      backgroundImage: {
        heroSectionBgImg: "url('assets/images/bannerImg.png')",
        bookingFlowBgImg: "url('assets/images/dottedBg.png')",
        faqBgImg: "url('assets/images/faqBg.png')",
        bannerBg: "url('assets/images/bannerBg.png')",
        RequestaCallBack: "url('assets/images/request-a-call-back-bg.jpg')",
      },

      colors: {
        main: "#FF197D",
        mindfulWhite: "#FFFFFF",
        mindfulBlack: "#000000",
        mindfulBlue: "#02BCFB",
        mindfulLightBlue: "#D3F4FF",
        mindfulYellow: "#FABC2A",
        mindfulGreen: "#087E00",
        mindfulGrey: "#888888",
        mindfulGreySecondary: "#EAEAEA",
        mindfulGreyTertiary: "#7B7B7B",
        mindfulGreyTypeOne: "#7D7D7D",
        mindfulGreyTypeTwo: "#B4B4B4",
        mindfulGreyTypeThree: "#A8A8A8",
        mindfulLightGrey: "#CBCBCB",
        mindfulMildGrey: "#F7F7F7",
        mindfulLightPink: "#FFF5F9",
      },
    },
  },
  plugins: [],
};
