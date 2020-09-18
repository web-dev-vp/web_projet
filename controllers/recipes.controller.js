const createHttpError = require("http-errors");
const { create } = require("../models/recipes.model");
const RecipesModel = require("../models/recipes.model");

module.exports = {
  load: async () => await RecipesModel.find({}),
  detail: async (uri) => {
    try {
      const result = await RecipesModel.find({ uri: uri });
      if (result.length === 0) throw createHttpError("Recipes not found"); //không có uri trong db
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  },
  add: async(data) => {
      try {
          await RecipesModel.create(data);
      } catch (error) {
          throw createHttpError(error);
      }
  },
  get: async (uri) => await RecipesModel.find({uri : uri}),
  type: async (type) => {
    try {
      const result = await RecipesModel.find({ type: type });
      if (result.length === 0) throw createHttpError("This category has not been created yet."); //không có type trong db
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  }
};
