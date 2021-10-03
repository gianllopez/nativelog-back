const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 12
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  }
});

const UserModel = model('User', UserSchema);

module.exports = { UserModel };