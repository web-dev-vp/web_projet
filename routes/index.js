var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'La Petite Cuisine', js_file: "./../js/index.js", css_file: "./../css/index.css" });
});

/* GET all - recipe page */
router.get('/recipes', function(req, res, next) {
  res.render('recipes', { title: "All Recipes - La Petite Cuisine", js_file: "./../js/recipes.js", css_file: "./../css/recipes.css" });
});

/*GET category page */
router.get('/recipes-:cat', function(req, res, next) {
  const category = req.params.cat;
  res.render('recipes_cat', { title: category + " - La Petite Cuisine", page_name: category, js_file: "./../js/recipes.js", css_file: "./../css/recipes.css" });
});

/* GET recipe detail page */
router.get('/recipes/:uri', function(req, res, next) {
  const name_dish = req.params.uri;
  res.render('detail', { title: name_dish + " - La Petite Cuisine", js_file: "./../js/detail.js", css_file: "./../css/detail.css" });
});

module.exports = router;
