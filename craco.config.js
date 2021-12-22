// const CracoLessPlugin = require("craco-less");
const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: "./src/sass/app.sass",
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
