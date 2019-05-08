import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'

export default {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({}),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
            {
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            }
            }
        ]
        },
        {
          test: /\.json$/,
          use: ['json-loader']
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '/fonts/[name].[ext]'
              }
            }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
          },]
    },
    mode:"development",
    devServer: {
            contentBase: './dist',
            inline:true,
            port: 9000,
            before: function(app, server) {
              app.get('/api/*', function(req, res) {
                res.redirect('http://localhost:9090/api/'+req.params[0]);
              });
            }
    },
    plugins: [
        new CopyPlugin([
          { from: 'src/data.csv', to: '',flatten:true, },
        ]),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css',
          }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};