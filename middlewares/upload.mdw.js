const path = require("path");
var multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { resolve } = require("path");

// config stoge
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "tmp/my-uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const storage = new Storage({
  projectId: "breadshop-61d69",
  keyFilename:
    "configs/breadshop-61d69-firebase-adminsdk-2ayft-65a4a1e5ea.json",
});
const bucket = storage.bucket("gs://breadshop-61d69.appspot.com");

var upload = multer({ storage: multer.memoryStorage() });

const UploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) reject("File not found");

    const fileUpload = bucket.file(file.originalname); // file.originalname == image.jpg

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => reject(error));
    stream.on("finish", () => {
      // console.log("finish");
      // getSignedUrl

      fileUpload
        .getSignedUrl({ action: "read", expires: "09-19-2030" })
        .then((urls) => resolve(urls[0]));

      // resolve({ message: "Success" });
    });
    stream.end(file.buffer);
  });
};

module.exports = { upload, UploadImageToStorage };
