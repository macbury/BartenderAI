const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin')
const { environment } = require('@rails/webpacker')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const { resolve } = require('path')

environment.plugins.append('html',
  new HtmlWebpackPlugin({
    inject: 'body',
    alwaysWriteToDisk: true,
    filename: '../index.html',
    template: resolve('app', 'javascript', 'index.html')
  })
)

environment.plugins.append('hardisk', new HtmlWebpackHarddiskPlugin())

environment.plugins.append('fuckFlow', new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/))
environment.plugins.append('pwa', new WorkboxPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  importWorkboxFrom: 'local',
  include: [/\.svg$/]
}))

environment.plugins.insert('HashedModuleIds', new webpack.HashedModuleIdsPlugin(), { before: 'manifest' })

environment.plugins.append(
  'CommonsChunkVendor',
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  })
)

environment.plugins.append(
  'CommonsChunkManifest',
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  })
)


environment.plugins.append('cache', new HardSourceWebpackPlugin())

environment.plugins.append('dll', new AutoDllPlugin({
  filename: 'libs.dll.js',
  inject: true,
  //debug: isDevelopment,
  path: "",
  entry: {
    vendor: [
      'react',
      'react-dom',
      'three',
      'actioncable',
      'apollo-cache-inmemory',
      'apollo-client',
      'apollo-link-error',
      'apollo-link-http',
      'qrcode.react',
      'react-color',
      'react-github-corner',
      'react-router',
      'react-router-dom',
      'react-sortable-hoc',
      'react-toastify',
      'reactstrap',
      'stats.js',
      'unfetch'
    ]
  }
}))

const webpackConfig = environment.toWebpackConfig()

module.exports = {
  ...webpackConfig,
  target: 'web',
  entry: {
    application: resolve('app/javascript/packs/application.js')
  }
}
