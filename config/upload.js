const multer = require("multer")
const multerS3 = require("multer-s3")
const s3 = require("./aws");

const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: "process.env.S3_BUCKET",
        acl: "public-read",
        metadata:function (req, file, cb){
            cb(null, {filename: file.fileName});
        },
        key: function (req, file, cb){
            const fileName = `product/${Date.now().toString()}_${file.originalname}`;
            cb(null, fileName);
        }
    })
});

module.exports = upload;