const multer = require('multer');
exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "public/product/images/");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    return cb(new Error('file type is not allowed only jpeg,jpg or png allowes'), false)
  }
}


