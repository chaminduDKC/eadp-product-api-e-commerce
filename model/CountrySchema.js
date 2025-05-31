const mongoose = require('mongoose');
const CountrySchema
    = new mongoose.Schema({
    countryName:{
        type:String,
        required:true
    },
    flag:{
        type:Object
    },
    countryCode:{
        type:String
    }
});
module.exports = mongoose.model('countries',CountrySchema);