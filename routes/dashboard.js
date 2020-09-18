// !!! Tại sao route dashboard phải thành file mới???

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
var multer = require("multer");

// config stoge
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

const recipesController = require("../controllers/recipes.controller");
const RecipeModel = require("../models/recipes.model");

router.get("/", async (req, res) => {
  const { token } = req.cookies;
  const decode = jwt.decode(token);
  const { username } = decode;

  const data = await recipesController.getByAuthor(username);

  console.log("data", data);
  res.render("pages/my_recipes", { layout: "layouts/dashboard", data: data });
});

router.post("/add-recipe", upload.single("image"), (req, res) => {
  // moi du lieu trong form (txt+img)
  // luu img vao storage => url
  // text + url ==> database
  const { token } = req.cookies;
  const decoded = jwt.decode(token);
  const { username } = decoded;

  const { file } = req;

  const data = JSON.parse(JSON.stringify(req.body));
  console.log('data', data)
  console.log("file", file);
  res.send(file);

//   // tair file leen firebase -> url

//   // firebase
//   img-src: url

  //   RecipesController.add({ ...recipes, username });
});

module.exports = router;
