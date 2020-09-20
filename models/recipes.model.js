const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: { type: String, autoIndex: false },
    uri: { type: String, unique: true, autoIndex: false },
    author: String,
    img: String,
    date: Date,
    type: String,
    duration: Number,
    complex: String,
    serve: Number,
    saves: Number,
    description: { type: String, autoIndex: false },
    ingredients: Array,
    direction: Array,
    deleteDate: String,
  }
);

// RecipeSchema.index({ ingredients: "text" });

// RecipeSchema.index({ name: { $regex: } });

const RecipeModel = mongoose.model("recipes", RecipeSchema);

module.exports = RecipeModel;
