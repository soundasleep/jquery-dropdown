var webpack = require('webpack'),
  path = require('path'),
  minimize = process.argv.indexOf('--minimize') !== -1;

var plugins = [];
if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  resolve: {
    extensions: ['', '.js', 'min.js'],
    root: [
      path.resolve('.'),
    ]
  },
  entry: {
    'dist/jquery.dropdown': './jquery.dropdown',
  },
  output: {
    path: __dirname,
    filename: minimize ? "[name].min.js" : "[name].js",
    externals: [{
      'jquery': 'jQuery',
    }, ]
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.(scss|sass)$/,
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.html$/,
      loader: "html?-minimize"
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
