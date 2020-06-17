const path = require("path");
const sets = require("../webpack.settings");
const P = sets.paths;
const SERV = {
  poll: () => false,
  https: () => false
};

module.exports = () => {
  return {
    devServer: {
      contentBase: path.resolve(P.dir, P.dist),
      public: "http://localhost:8081",
      host: "localhost",
      port: 8081,
      https: !!parseInt(SERV.https(), 10),
      watchOptions: {
        poll: !!parseInt(SERV.poll(), 10),
        ignored: /node_modules/
      },
      overlay: {
        // вывод ошибок и предуперждений в браузер
        warning: true,
        error: true
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      watchContentBase: true,
      writeToDisk: false,
      inline: true,
      hot: true,
      open: true
    },
    watchOptions: { aggregateTimeout: 150 }
  };
};
