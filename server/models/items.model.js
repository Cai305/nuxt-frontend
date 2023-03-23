const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
    item_type: String,
    slug:String,
    locale:String,
    creator:String,
    media:String,
    content: String,
    categories: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Items', ItemsSchema);