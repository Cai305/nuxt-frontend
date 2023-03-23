const Locale = require('../models/locale.model');

// Create and Save a new locale
exports.create = (req, res) => {

    console.log(req)
      // Validate request
      if(!req.body.title) {
        return res.status(400).send({
            message: "locale title can not be empty"
        });
    }

        // Create a locale
        const locale = new Locale({

            title: req.body.title,
            description: req.body.description,
            summary: req.body.summary,
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_summary: req.body.seo_summary,
            use_seo_value: req.body.use_seo_value
        });

    // Save locale in the database
    locale.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the locale."
        });
    });
};    



// Retrieve and return all locale from the database.
exports.findAll = (req, res) => {
    Locale.find()
    .then(locale => {
        res.send(locale);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving locales."
        });
    });
};

// Find a single media with a mediaId
exports.findOne = (req, res) => {

    Locale.findById(req.params.localeId)
    .then(locale => {
        if(!locale) {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });            
        }
        res.send(locale);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });                
        }
        return res.status(500).send({
            message: "Error retrievinglocale with id " + req.params.localeId
        });
    });
};

// Update a locale identified by themediaeId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body.title) {
        return res.status(400).send({
            message: "Locale content can not be empty"
        });
    }

    // Find locale and update it with the request body
    Locale.findByIdAndUpdate(req.params.localeId, {
            title: req.body.title,
            description: req.body.description,
            summary: req.body.summary,
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_summary: req.body.seo_summary,
            use_seo_value: req.body.use_seo_value
    }, {new: true})
    .then(locale => {
        if(!locale) {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });
        }
        res.send(locale);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });                
        }
        return res.status(500).send({
            message: "Error updating locale with id " + req.params.localeId
        });
    });

};

// Delete a Locale with the specified LocaleId in the request
exports.delete = (req, res) => {

    Locale.findByIdAndRemove(req.params.localeId)
    .then(locale => {
        if(!locale) {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });
        }
        res.send({message: "locale deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "locale not found with id " + req.params.localeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete locale with id " + req.params.localeId
        });
    });

};