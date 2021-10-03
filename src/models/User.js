const { Schema, model } = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

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

UserSchema.plugin(UniqueValidator, {
  message: 'The given {PATH} is already in use.'
});

const UserModel = model('User', UserSchema);

module.exports = { UserModel };