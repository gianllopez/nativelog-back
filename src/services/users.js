const mongoose = require('mongoose');
const { UserModel } = require('../models/User');

class UsersService {

  #col = null;

  constructor() {
    mongoose.connect('mongodb://localhost:27017/nativelog')
      .then(db => this.#col = db.connection.collection('users'))
      .catch(err => console.error(err));
  };

  async createUser(data) {
    return new Promise((res, rej) => {
      let user = new UserModel(data);
      user.save(err => {
        if (err) rej(err);
        res(user);
      });
    });
  };

};

module.exports = { UsersService };