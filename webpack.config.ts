import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

type bundleMode = 'development' | 'production';

const MODE: bundleMode = 'development';
const enabledSourceMap = MODE === 'development';

const rules: webpack.Rule[] = [
  {
    test: /\.html$/,
    use: 'html-loader'
  },
  {
    test: /\.ts$/,
    use: 'ts-loader'
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          url: false,
          sourceMap: enabledSourceMap,
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: enabledSourceMap,
          plugins: [
            require('cssnano')({ preset: 'default' }),
            require('autoprefixer')({
              grid: true,
              browsers: ['IE 11', 'last 2 versions']
            })
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: enabledSourceMap
        }
      }
    ]
  }
];

const module: webpack.Module = {
  rules
};

const config: webpack.Configuration = {
  mode: MODE,
  devtool: 'source-map',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(`${process.cwd()}/dist`)
  },
  module,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html'
    })
  ]
};

export default config;
