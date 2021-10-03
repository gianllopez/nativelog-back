const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User');

class UsersService {

  constructor() {
    mongoose.connect('mongodb://localhost:27017/nativelog')
      .catch(err => console.error(err));
  };

  async create(data) {
    return new Promise((res, rej) => {
      let user = new UserModel(data);
      user.save(err => {
        if (err) return rej(err);
        res(user);        
      });
    });
  };

  async get(creds) {
    return await UserModel.findOne(creds).exec();
  };

};

module.exports = { UsersService };