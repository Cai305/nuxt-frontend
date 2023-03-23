const Item  = require('../models/items.model');


// Create and Save a new item
exports.create = (req, res) => {
      // Validate request
      if(!req.body.item_type) {
        return res.status(400).send({
            message: "item type can not be empty"
        });
    }

        // Create a item
        const item = new Item({
          
            item_type: req.body.item_type,
            slug:req.body.slug,
            locale:req.body.locale,
            creator:req.body.creator,
            media:req.body.media,
            content: req.body.content,
            categories:req.body.categories,
        });

    // Save item in the database
    item.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};    



// Retrieve and return all locale from the database.
exports.findAll = (req, res) => {
    Item.find()
    .then(item => {
        res.send(item);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving item."
        });
    });
};

// Find a single item with a itemId
exports.findOne = (req, res) => {

    Item.findById(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });            
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error retrievingitem with id " + req.params.itemId
        });
    });
};

// Update a item identified by the itemId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body.item_type) {
        return res.status(400).send({
            message: "item content can not be empty"
        });
    }

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {
        item_type: req.body.item_type,
        slug:req.body.slug,
        locale:req.body.locale,
        creator:req.body.creator,
        media:req.body.media,
        content: req.body.content,
        categories:req.body.categories,
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.itemId
        });
    });

};

// Delete a item with the specified itemId in the request
exports.delete = (req, res) => {

    Item.findByIdAndRemove(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        res.send({message: "item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Could not delete item with id " + req.params.itemId
        });
    });

};