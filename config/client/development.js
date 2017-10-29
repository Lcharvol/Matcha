const server = { host: '127.0.0.1', port: 3000 };
const serverUrl = `http://${server.host}:${server.port}`;
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  server,
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: serverUrl,
        secure: false,
      }
    },
  },
}
