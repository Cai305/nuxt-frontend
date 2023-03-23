module.exports = (app) => {
    const locale = require('../controllers/locale.controller.js');

    // Create a new locale
    app.post('/locale', locale.create);

    // Retrieve all locales
    app.get('/locale', locale.findAll);

    // Retrieve a single locale with localeId
    app.get('/locale/:localeId', locale.findOne);

    // Update a locale with localeId
    app.put('/locale/:localeId', locale.update);

    // Delete a locale with localeId
    app.delete('/locale/:localeId', locale.delete);
}