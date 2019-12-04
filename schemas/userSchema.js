const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const constants = require('../modules/constants');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String, 
        validate: {
            validator: function(text){ return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(text); },
            message: "Email is not valid."
        }
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isPasswordValid = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model(constants.userModelName, userSchema, constants.usersCollectionName);