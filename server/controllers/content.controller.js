const Content = require('../models/content.model');


// Create and Save a new content
exports.create = (req, res) => {

    console.log(req.body);
      // Validate request
      if(!req.body.src && !req.body.extension) {
        return res.status(400).send({
            message: "Content src can not be empty"
        });
    }

    

        // Create a content
        const content = new Content({
            src: req.body.src,
            extension: req.body.extension,
            text:req.body.text,
            quality:req.body.quality,
            size:req.body.size,
            size_unit:req.body.size_unit,

        });
        console.log(content);
    // Save content in the database
    content.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Content."
        });
    });
};

// Retrieve and return all contents from the database.
exports.findAll = (req, res) => {
    Content.find()
    .then(content => {
        res.send(content);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contents."
        });
    });
};

// Find a single content with a contentId
exports.findOne = (req, res) => {

    Content.findById(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });            
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.contentId
        });
    });
};

// Update a content identified by the contenteId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body.src || !req.body.extension || !req.body.text) {
        return res.status(400).send({
            message: "Content id can not be empty"
        });
    }

    // Find content and update it with the request body
    Content.findByIdAndUpdate(req.params.contentId, {
  


        src: req.body.src,
        extension: req.body.extension,
        text:req.body.text,
        quality:req.body.quality,
        size:req.body.size,
        size_unit:req.body.size_unit,



    }, {new: true})
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Error updating content with id " + req.params.contentId
        });
    });

};

// Delete a content with the specified contentId in the request
exports.delete = (req, res) => {

    Content.findByIdAndRemove(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });
        }
        res.send({message: "content deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete content with id " + req.params.contentId
        });
    });

};