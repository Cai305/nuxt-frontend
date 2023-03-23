const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    src: String,
    extension: String,
    text:String,
    quality:String,
    size:String,
    size_unit:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', ContentSchema);