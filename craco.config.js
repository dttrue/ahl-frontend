// craco.config.js
// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.node = {
          global: false,
        };
        return webpackConfig;
      },
    },
  };
  
  