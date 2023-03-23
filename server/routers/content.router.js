module.exports = (app) => {
    const content = require('../controllers/content.controller.js');

    // Create a new content
    app.post('/content', content.create);

    // Retrieve all Ncontent
    app.get('/content', content.findAll);

    // Retrieve a single content with contentId
    app.get('/content/:contentId', content.findOne);

    // Update a content with contentId
    app.put('/content/:contentId', content.update);

    // Delete a content with contentId
    app.delete('/content/:contentId', content.delete);
}