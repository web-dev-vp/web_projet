var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();
var moment = require("moment");

const RecipeController = require("../controllers/recipes.controller");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const latest = await (await RecipeController.getLatestRecipes()).slice(0,5);
  res.render("index", {
    title: "La Petite Cuisine",
    js_file: "./../js/recipes.js",
    css_file: "./../css/recipes.css",
    latest: latest
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
router.get("/recipes/:uri", async (req, res, next) => {
  const name_dish = req.params.uri;
  const data = await RecipeController.detail(name_dish);
  const result = data[0];
  const category = result.type.charAt(0).toUpperCase() + result.type.slice(1);
  const up_date = moment(data[0].date).format('llll'); // Mon, Sep 21, 2020 9:43 PM
  console.log("data detail", data[0]);

  const similar = await RecipeController.similar(name_dish, result.type);

  res.render("detail", {
    title: name_dish + " - La Petite Cuisine",
    js_file: "./../js/detail.js",
    css_file: "./../css/detail.css",
    data: result,
    category: category,
    up_date: up_date,
    similar: similar
  });
});

// router.get("/recipes/search/:keyword", async (req, res, next) => {
//   const { keyword } = req.params;
//   console.log("keyword", keyword);

//   const searchResult = await RecipeController.search(keyword);

//   res.status(200).json(searchResult);
// });

router.get("/search-by-name-:keyword", async (req, res, next) => {
//   const { search } = req.body;
  // console.log("keyword", keyword);
  let { keyword } = req.params;
  console.log("keyword:", keyword);
  try {
    const searchResult = await RecipeController.searchByName(keyword);
    res.render("recipes_cat", {
       title: "Search Results - La Petite Cuisine",
       page_name: `Results of ${keyword.split("&").join(" ")}`,
       js_file: "./../js/recipes.js",
       css_file: "./../css/recipes.css",
       datas: searchResult,
     })
    }
     catch(error) {
      next(createHttpError(error));
     }
  
  //res.status(200).json(searchResult);
});

router.get("/search-by-ingre-:keyword", async (req, res, next) => {
  const { keyword } = req.params;
  console.log("keyword", keyword);
  try {
    const searchResult = await RecipeController.searchByIngredients(keyword);

    res.render("recipes_cat", {
      title: "Search Results - La Petite Cuisine",
      page_name: `Results of Ingredients: ${keyword.split("&").join(", ")}`,
      js_file: "./../js/recipes.js",
      css_file: "./../css/recipes.css",
      datas: searchResult,
    })
  }
  catch(error) {
    next(createHttpError(error));
  }
  
});

module.exports = router;
