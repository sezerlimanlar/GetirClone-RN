module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"], // Bu tüm alt klasörlerdeki js, jsx, ts, tsx dosyalarını tarar
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        getirClone:"#5D38BE",
        getirClone2:"#7849F7",
        getirBg:"#f5f5f5"
      }
    },
  },
  plugins: [],
};
