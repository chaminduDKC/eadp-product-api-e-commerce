const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "mumbai",
});

const s3 = new AWS.S3();
module.exports = s3;