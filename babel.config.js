module.exports = (api) => {
  api.cache(false);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-transform-react-remove-prop-types',
      ['@babel/plugin-transform-runtime', {
        helpers: false,
        regenerator: true,
      }],
    ],
  };
};
