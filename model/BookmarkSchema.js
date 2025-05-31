const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:Object,
    },
    createdDate:{
        type:Date,
        required:true
    },

});
module.exports = mongoose.model('bookmarks',BookmarkSchema);