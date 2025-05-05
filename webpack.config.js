// noinspection JSUnusedLocalSymbols
const webpack = require('webpack');
const path = require('path');
// const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  let obj = {
    entry: {
      //   vendor: [
      //     'ag-grid-react',
      //     'polished',
      //     'styled-components',
      //     'react-draggable',
      //     'react-resizable',
      //     'react-grid-layout',
      //     'formik',
      //     'yup',
      //     'classnames',
      //   ],
      app: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
    },
    //commented to build a custom pages
    // "optimization": {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 chunks: 'all',
    //                 name: 'vendor',
    //                 test: 'vendor',
    //                 enforce: true
    //             },
    //         }
    //     },
    //     runtimeChunk: true
    // },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        //handlebars js webpack issue fix
        handlebars: 'handlebars/dist/handlebars.min.js',
        'primereact/api': '@retina360-ai/core-ui-library-v2/vendor/primereact/api.esm.js',
        //sales dashboard - bar chat text not visible in plotly version 1.53.0 to fix that issue used the version 2.32.0 
        'plotly.js':'@retina360-ai/core-ui-library-v2/vendor/plotly-2.32.0.min.js',
      },
    },
    module: {
      rules: [
        {test: /\.tsx?$/, loader: 'ts-loader'},
        {
          test: /\.css$/,
          //test: /\.s[ac]ss$/i,
          use: [argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'icons/[name].[contenthash][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[contenthash][ext][query]',
          },
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // TODO: Enable source map loader
        //{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      //for jspdf - Webpack will automatically create separate chunks for each of the optional dependencies
      //If your application does not use any of the optional dependencies, you can prevent Webpack from generating the chunks by defining them as external dependencies
      canvg: 'canvg',
      // html2canvas: 'html2canvas',
      dompurify: 'dompurify',
    },
    devServer: {
      client: {
        overlay: {errors: true, warnings: false},
      },
      static: [
        {
          directory: path.join(process.cwd()),
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        path: `./.env.${env.file}`,
      }),
      // fix "process is not defined" error in constants/environment.ts file also react-textfit depends on the process.
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
        numeral: 'numeral',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        title: 'Customer Relationship Management(CRM)',
        hash: true,
        inject: 'body',
      }),
      new CopyPlugin({
        patterns: [
          {from: 'src/assets/images', to: 'images'},
          {from: 'src/assets/data', to: 'data'},
        ],
      }),
    ].concat(
      argv.mode === 'development'
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: 'css/[name].[contenthash].css',
            }),
          ]
    ),
  };

  // if (argv.mode === 'development') {
  //   obj.devtool = 'eval-source-map';
  // }
  // else{
  //   obj.devtool = 'source-map';
  // }

  return obj;
};
