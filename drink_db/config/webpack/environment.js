const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin')
const { environment } = require('@rails/webpacker')
const { resolve } = require('path')

environment.plugins.append('fuckFlow', new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/))
environment.plugins.append('pwa', new WorkboxPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  importWorkboxFrom: 'local',
  include: [/\.svg$/]
}))

const webpackConfig = environment.toWebpackConfig()

module.exports = {
  ...webpackConfig,
  target: 'web',
  entry: {
    application: resolve('app/javascript/packs/application.tsx')
  }
}

module.exports = environment.toWebpackConfig()
