const server = { host: '0.0.0.0', port: 3000 };
const serverUrl = `http://${server.host}:${server.port}`;
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  server,
  serverUrl,
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
  },
}
