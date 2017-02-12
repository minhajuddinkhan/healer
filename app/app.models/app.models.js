let mongoose = require('mongoose');
module.exports = function () {
    let Schema = mongoose.Schema;
    let models = {};

    let User = require('./user.model')(Schema);
    let Dua = require('./dua.model')(Schema);
    let Category = require('./category.models')(Schema);

    models.User = mongoose.model('User', User);
    models.Category= mongoose.model('Category',Category);
    models.Dua = mongoose.model('Dua', Dua);

    return models;
};