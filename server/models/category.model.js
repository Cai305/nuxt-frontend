const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    slug: String,
    path: String,
    ancestor_ids: [],
    parent_id: String,
    locale : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);