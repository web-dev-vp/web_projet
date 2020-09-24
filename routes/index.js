var express = require("express");
const createHttpError = require("http-errors");
var router = express.Router();
var moment = require("moment");

const RecipeController = require("../controllers/recipes.controller");
const CategoryController = require("../controllers/category.controller");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const latest = (await RecipeController.getLatestRecipes()).slice(0,4);
  const simple = (await RecipeController.getSimpleRecipes()).slice(0,6);
  const family = (await RecipeController.getFamilyRecipes()).slice(0,5);

  const food = await CategoryController.get("food")
  const drink = await CategoryController.get("drink")
  const dessert = await CategoryController.get("dessert")
  const salad = await CategoryController.get("salad")

  res.render("index", {
    title: "La Petite Cuisine",
    js_file: "./../js/index.js",
    css_file: "./../css/index.css",
    latest: latest,
    simple: simple,
    family: family,
    food: food,
    drink: drink,
    salad: salad,
    dessert: dessert
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
  const _type = category.charAt(0).toUpperCase() + category.slice(1);

  const cat = await CategoryController.get(category);
  res.render("recipes_cat", {
    title: category + " - La Petite Cuisine",
    page_name: category,
    _type: _type,
    js_file: "./../js/recipes.js",
    css_file: "./../css/recipes.css",
    datas: _datas,
    cat: cat
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
  const similar = (await RecipeController.similar(name_dish, result.type)).slice(0,3);

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

router.get("/contact", function(req, res) {
  res.render("contact", {
    title: "Contact - La Petite Cuisine",
    js_file: "./../js/contact.js",
    css_file: "./../css/contact.css"})
})

module.exports = router;
