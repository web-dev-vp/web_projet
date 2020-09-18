const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: String,
  uri: {type: String, unique: true},
  author: String,
  img: String,
  date: Date,
  type: String,
  duration: Number,
  complex: String,
  serve: Number,
  saves: Number,
  description: String,
  ingredients: Array,
  direction: Array
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);

module.exports = RecipeModel;
