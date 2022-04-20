const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  https: true,
  useProxy: true,
  useChromeTemplate: true,
  routesPath: process.env.CONFIG_PATH,
  appUrl: process.env.BETA ? ['/beta/insights/tasks'] : ['/insights/tasks'],
  env: process.env.BETA ? 'stage-beta' : 'stage-stable',
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')(
    {
      root: resolve(__dirname, '../'),
      exposes: {
        './RootApp': resolve(__dirname, '../src/DevEntry'),
      },
      exclude: ['react-redux'],
      shared: [
        {
          'react-redux': {
            requiredVersion: '*',
            singleton: true,
          },
        },
      ],
    }
  )
);

module.exports = {
  ...webpackConfig,
  plugins,
};
