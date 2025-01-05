const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // Set mode to 'development' or 'production' based on your needs
  devtool: 'source-map',

  // Define multiple entry points
  entry: {
    background: './src/background/index.js',  // Background script
    content: './src/content/index.js',        // Content script
    popup: './src/popup/index.js',            // Popup script
    options: './src/options/index.js',        // Options page script
  },

  // Output settings
  output: {
    filename: '[name].bundle.js', // Output file name is based on entry point name
    path: path.resolve(__dirname, 'dist'),  // Output directory for bundled files
  },

  // Module rules (e.g., Babel for JS transpiling)
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // CSS loading for content script and popup
      },
    ],
  },

  resolve: {
    alias: {
      'exif.js': path.resolve(__dirname, 'src/modules/exif.js')
    },
    extensions: ['.js', '.json'], // Handle file extensions
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: 'manifest.json' },
        { from: './src/assets', to: 'assets' }, // Copy assets (e.g., images)
        { from: './src/popup/popup.html', to: 'popup.html' },
        { from: './src/options/options.html', to: 'options.html' },
      ],
    }),
  ],

};