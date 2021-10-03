const jwt = require('jsonwebtoken');

class JWTService {

  #hash = process.env.SALT_HASH;

  async sign(data) {
    return new Promise((res, rej) => {
      jwt.sign(data.toJSON(), this.#hash, (err, token) => {
        if (err) return rej(err);
        res(token);
      });
    });
  };

};

module.exports = { JWTService };