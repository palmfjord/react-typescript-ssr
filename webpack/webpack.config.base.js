const webpack = require('webpack')
const path = require('path')

const sourcePath = path.resolve(path.join(__dirname, '..', 'src'))

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      'es6-promise',
      path.resolve(path.join(sourcePath, 'index.tsx')),
    ],
  },
  output: {
    path: path.resolve(path.join(__dirname, '..', 'build')),
    publicPath: '/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [
      path.resolve(path.join(__dirname, '..', 'src')),
      path.resolve(path.join(__dirname, '..', 'node_modules')),
    ],
  },
  devtool: 'source-map',
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader', 'awesome-typescript-loader'],
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        include: path.resolve(__dirname, '..', 'src'),
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.svg$/, use: 'svg-inline-loader' },
      {
        test: /\.(png|gif|jpg)$/,
        include: sourcePath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20480,
              name: 'assets/[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin()
  ],
}