var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();

const RecipeController = require("../controllers/recipes.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "La Petite Cuisine",
    js_file: "./../js/index.js",
    css_file: "./../css/index.css",
  });
});

/* GET all - recipe page */
router.get("/recipes", async (req, res) => {
  const _datas = await RecipeController.load();
  console.log("_datas", _datas);
  res.render("recipes", {
     title: "All Recipes - La Petite Cuisine",
     js_file: "./../js/recipes.js",
     css_file: "./../css/recipes.css",
     datas: _datas,
   });

  //res.status(200).json(_datas);
});

/*GET category page */
router.get("/recipes-:cat", async (req, res, next) => {
  const category = req.params.cat;
  const _datas = await RecipeController.type(category);

  res.render("recipes_cat", {
    title: category + " - La Petite Cuisine",
    page_name: category,
    js_file: "./../js/recipes.js",
    css_file: "./../css/recipes.css",
    datas: _datas,
  });

  res.render("recipes_cat", {
    title: category + " - La Petite Cuisine",
    page_name: category,
    js_file: "./../js/recipes.js",
    css_file: "./../css/recipes.css",
    datas: _datas,
  });
});

/* GET recipe detail page */
router.get("/recipes/:uri", function (req, res, next) {
  const name_dish = req.params.uri;
  res.render("detail", {
    title: name_dish + " - La Petite Cuisine",
    js_file: "./../js/detail.js",
    css_file: "./../css/detail.css",
  });
});

// router.get("/recipes/search/:keyword", async (req, res, next) => {
//   const { keyword } = req.params;
//   console.log("keyword", keyword);

//   const searchResult = await RecipeController.search(keyword);

//   res.status(200).json(searchResult);
// });

router.get("/search-:keyword", async (req, res, next) => {
//   const { search } = req.body;
  // console.log("keyword", keyword);
  const { keyword } = req.params;
  console.log("keyword:", keyword);
  console.log("type keyword:", typeof(keyword));
  const searchResult = await RecipeController.searchByName(keyword);
  console.log(searchResult);
  // res.render("recipes_cat", {
  //   title: "Search Results - La Petite Cuisine",
  //   page_name: `Results of ${keyword}`,
  //   js_file: "./../js/recipes.js",
  //   css_file: "./../css/recipes.css",
  //   datas: searchResult,
  // })
  res.status(200).json(searchResult);
});

router.post("/recipes/search-by-ingre/", async (req, res, next) => {
  const { keyword } = req.body;
  console.log("keyword", keyword);

  const searchResult = await RecipeController.searchByIngredients(keyword);

  res.status(200).json(searchResult);
});

module.exports = router;
