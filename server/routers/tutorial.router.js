module.exports = (app) => {
    const tutorial = require("../controllers/tutorial.controller.js");
    // Create a new media
    app.post("/tutorial", tutorial.create);
    // Retrieve all medias
    app.get("/tutorial", tutorial.findAll);
    // Retrieve a single tutorial with tutorialId
    app.get("/tutorial/:tutorialId", tutorial.findOne);
    // Update a tutorial with tutorialId
    app.put("/tutorial/:tutorialId", tutorial.update);
    // Delete a tutorial with tutorialId
    app.delete("/tutorial/:tutorialId", tutorial.delete);
    // Find all published tutorial
    app.get("/tutorial/published", tutorial.findAllPublished);
};
