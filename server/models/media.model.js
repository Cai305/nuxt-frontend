const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    type: String,
    src : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);