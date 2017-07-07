'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var mockObjects = false;
var common = require('./common');
var plugins = [];
var MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;

console.log('Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : 'build') + ' mode');

/** environment setup */

var env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev';
if(env === 'prod'){
  console.log('PRODUCTION mode');
}
else if(env === 'test'){
  console.log('TEST mode');
  mockObjects = true;
}
else if(env === 'mock'){
  console.log('MOCK mode');
  mockObjects = true;
}
else{
  console.log('DEVELOPMENT mode');
}

/** before build */

var hash = env === 'prod' ? '-[hash]' : '';

//in build mode, cleanup build folder before
if(MODE_DEV_SERVER === false){
  console.log('Cleaning ...');
  var deleted = require('del').sync(['build/*','build/**/*',"!.git/**/*"]);
  deleted.forEach(function(e){
    console.log(e);
  });
}

/** plugins setup */

plugins.push(new webpack.NoErrorsPlugin());
// extract css into one main.css file
plugins.push(new ExtractTextPlugin('css/main' + hash + '.css',{
  disable: false,
    allChunks: true
}));
plugins.push(new webpack.BannerPlugin(common.getBanner()));

if(env === 'prod'){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
}

if(MODE_DEV_SERVER === false){
  //write infos about the build (to retrieve the hash) https://webpack.github.io/docs/long-term-caching.html#get-filenames-from-stats
  plugins.push(function() {
    this.plugin("done", function(stats) {
      console.log('');//break line

      require("fs").writeFileSync(
        path.join(__dirname, "build", "stats.json"),
        JSON.stringify(stats.toJson()));
      console.log('Created /build/stats.json file');

      //save the git revision hash (on heroku, it can only be retrieved at compile time), that way, it will be available to express after
      var bannerInfos = require('./common').getInfos();
      require("fs").writeFileSync(
        path.join(__dirname, "build", "bannerInfos.json"),
        JSON.stringify(bannerInfos));
      console.log('Created /build/bannerInfos.json file');
    });
  });
}

/** webpack config */

var resolve = {
  alias : {}
};
//only used browser side
resolve.alias['httpServiceConfiguration'] = path.resolve(__dirname, './src/services/httpService/config/environment/config' + (env === 'prod' ? '.build' : (env === 'mock' ? '.mock' : '.dev' ) ) + '.js');

var config = {
  entry: {
    "js/bundle": [
      "./src/bootstrap.jsx"
    ],
    "css/main": "./src/style/main.scss"
  },
  output: {
    publicPath: "/assets/",
    filename: "[name]" + hash + ".js",
    path: "./build/assets"
  },
  cache: true,
  debug: env === 'prod' ? false : true,
  devtool: env === 'prod' ? false : "sourcemap",
  devServer: {
    contentBase: './public',
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style-loader",
          "css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&" +
          "includePaths[]=" + (path.resolve(__dirname, "./node_modules"))
        )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: resolve,
  plugins: plugins
};

module.exports = config;