const path = require('path');

module.exports = {
  entry: {
    graph: path.join(__dirname, '/public/js/graph.js'),
    renderer: path.join(__dirname, '/public/js/renderer.js'),
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, './public/js'),
  },
  node: {
    fs: 'empty',
  },
};
