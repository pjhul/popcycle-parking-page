module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.tsx", "./public/index.html"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g)|| [],
    }),
  ]
}
