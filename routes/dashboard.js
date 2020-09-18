// !!! Tại sao route dashboard phải thành file mới???

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.render("dashboard", { layout: false }));

// router.post("/add-recipes", (req, res) => {
//   // generate token username-> data ->uwhr fslfkjsd;<i class="fa fa-jsfiddle
//   // " aria-hidden="true"></i>
//   const { token } = req.cookies;
//   const decoded = jwt.decode(token);
//   const { username } = decoded;

//   RecipesController.add({...recipes,username})
// });

module.exports = router;
