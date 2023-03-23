const mongoose = require('mongoose');

const LocaleSchema = mongoose.Schema({
    title: String,
    description: String,
    summary: String,
    seo_title: String,
    seo_description: String,
    seo_summary: String,
    use_seo_value: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Locale', LocaleSchema);