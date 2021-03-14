const fs = require('fs')

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.crt'),
    },
    public: 'https://localhost:8080/'
  }
}
