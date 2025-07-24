module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader to avoid missing source map issues
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !rule.use || !rule.use.some(use => 
          use.loader && use.loader.includes('source-map-loader')
        )
      );
      
      // Disable source map generation in development to avoid issues
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.devtool = false;
      }
      
      return webpackConfig;
    },
  },
  eslint: {
    configure: {
      rules: {
        // Don't treat warnings as errors in production builds
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'eqeqeq': 'warn'
      }
    }
  }
};