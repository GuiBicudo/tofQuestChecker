const path = require('path');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
    entry: './frontend/main.js',
    output: {
      path: path.resolve(__dirname, 'public', 'assets'),
      filename: 'js/bundle.js',
      clean: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options:{
              presets: ['@babel/env']
            }
          },
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },{
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: ImageMinimizerPlugin.loader,
              // enforce: "pre",
              options: {
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    plugins: [
                      "imagemin-gifsicle",
                      "imagemin-mozjpeg",
                      "imagemin-pngquant",
                      "imagemin-svgo",
                    ],
                  },
                },
              },
            },
          ],
        },

      ]
    },
};
