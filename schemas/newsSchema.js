const constants = require('../modules/constants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        validate: {
            validator: function(text){ return text.indexOf('https://') === 0; },
            message: "News url is not define."
        }
    },
    category: String,
    language: String,
    country: String
});

module.exports = mongoose.model(constants.newsModelName, newsSchema, constants.newsCollectionName);