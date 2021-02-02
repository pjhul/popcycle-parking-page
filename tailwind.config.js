module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    fontFamily: {
      display: [
        "Rubik",
        'system-ui',
        '-apple-system',
        'blinkmacsystemfont',
        '"segoe ui"',
        'roboto',
        '"helvetica neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
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
    extend: {
      borderWidth: ["focus-within"]
    },
  },
  plugins: [],
}
