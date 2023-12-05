// next.config.js
module.exports = {
    webpack: (config) => {
      // Tell Webpack to treat the binary file as an external module
      config.externals = {
        './onnxruntime_binding.node': 'commonjs ./onnxruntime_binding.node',
      };
  
      return config;
    },
  };
  