module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    fontFamily: {
      "display": ["Rubik"],
    },
    animation: {
      spin: "spin 2s linear infinite",
    },
    extend: {
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      colors: {
        purple: {
          DEFAULT: "#27187e",
        },
        orange: {
          DEFAULT: "#ff6701",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
