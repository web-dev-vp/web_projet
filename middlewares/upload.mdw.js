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

module.exports = upload;
