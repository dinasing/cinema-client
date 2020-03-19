const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
      extensions: [ '.js']
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
          {
            test: /\.(ttf|eot|svg|woff|png)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]?[hash]'
            }            
          },
          {
              enforce: 'pre',
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'eslint-loader'
          },
          {
              test: /\.(css|scss|sass)$/,
              exclude: /\.module\.(css|scss|sass)$/,
              use: [
                  'style-loader',
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 1,
                      },
                  },
                  'sass-loader',
              ]
          },
          {
            test: /\.module\.(css|scss|sass)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                    },
                },
                'sass-loader',
            ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                          limit: 8192,
                      },
                  }
              ]

          }
      ]
  },
  resolve: {
      extensions: [
          '.js',
          '.jsx'
      ]
  },
  devServer: {
      contentBase: './dist'
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'public/index.html'
      }),
  ]
};