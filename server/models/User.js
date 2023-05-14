const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
        userId: {
          type: String,
          required: true
        },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
      picturePath: {
        type: String,
        default: "",
      },
      contacts: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
);

exports.User = mongoose.model("Users", UserSchema);
