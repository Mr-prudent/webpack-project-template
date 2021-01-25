const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const glob = require('glob');

let themeList = {};
let themePath = '[name]-style.css';

if (process.env.NODE_ENV == 'production') {
  themeList = {
    // blue: "./src/scss/index-blue.scss",
    // grey: "./src/scss/index-grey.scss",
    // red: "./src/scss/index-red.scss",
    // yellow: "./src/scss/index-yellow.scss",
    green: './src/scss/index-green.scss',
  };

  // 配置主题css
  themePath = 'theme/[name]/style.css';
}

let myEntry = {
  script: './src/js/index.js',
  inquiry: './src/lib/components/inquiry.jsx',
  yellow: './src/scss/index-yellow.scss',
  ...themeList,
};

// 复用loader
const commonCssLoader = [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

module.exports = {
  // entry: './src/js/index.js',
  entry: myEntry,

  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理scss资源
        test: /\.s[ac]ss$/,
        use: [...commonCssLoader, 'sass-loader'],
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: [ExtractCssChunks.loader, 'css-loader', 'postcss-loader'],
        // use: [
        //   ...commonCssLoader
        // ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [resolve(__dirname, 'node_modules'), resolve(__dirname, 'src/js/static')],
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 2,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        },
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.45, 0.65],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
            ],
          },
        },
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                ],
              },
            },
          },
          {
            loader: 'ejs-html-loader',
            options: {
              production: process.env.ENV === 'production',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|ejs|css|s[ac]ss|jpg|png|gif|woff|woff2|svg|ttf|eot)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'file',
        },
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),

    new MiniCssExtractPlugin({
      filename: themePath,
    }),

    new ExtractCssChunks({
      filename: 'swiper-animate.css',
    }),

    // 开启CSS压缩
    new OptimizeCssAssetsWebpackPlugin(),

    // 清楚build目录
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, './src/js/static'),
          to: resolve(__dirname, 'build/js'),
        },
      ],
    }),

    // 打包文件
    ...glob.sync(resolve(__dirname, './src/views/*.ejs')).map((filepath, i) => {
      const tempList = filepath.split(/[\/|\/\/|\\|\\\\]/g); // eslint-disable-line
      // 读取 CONFIG.EXT 文件自定义的文件后缀名，默认生成 ejs 文件，可以定义生成 html 文件
      const filename = ((name) => `${name.split('.')[0]}.html`)(`${tempList[tempList.length - 1]}`);
      const template = filepath;
      const fileChunk = 'script';
      const chunks = [fileChunk, 'yellow'];
      if (filename === 'inquiry.html') {
        chunks.push('inquiry');
      }
      return new HtmlWebpackPlugin({ filename, template, chunks });
    }),
  ],
  mode: 'production',
  performance: {
    hints: false,
  },
  externals: {
    jquery: 'jQuery',
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // hot: true
  },
};
