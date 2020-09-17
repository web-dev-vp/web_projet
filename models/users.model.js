const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  list_recipes: Array,
  save_recipes: Array,
  fullname: String,
  // "ava-img": String,    //
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
