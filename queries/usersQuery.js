const User = require('../schemas/userSchema');

module.exports.checkLoginIsVacant = function(login, callback){
    User.findOne({"login": login }, (err, user) => {
        var isVacant = !user;
        return callback(err, isVacant);
    });
}

module.exports.findUserById = function(id, callback){
    User.findById(id, (err, user) => {
        return callback(err, user);
    });
};

module.exports.findUserByLogin = function(login, callback){
    User.findOne({"login": login}, (err, user) => {
        return callback(err, user);
    });
}

module.exports.createUser = function(data, callback){
    var userItem = new User(data);

    userItem.password = userItem.generateHash(userItem.password);

    userItem.save(function (err, createdUser) {
        return callback(err, createdUser);
    });
}

module.exports.findOrCreateFacebookUser = function(username, email, firstName, lastName, callback){
    var userItem = new User(data);

    userItem.login = username;
    userItem.email = email;
    userItem.name.firstName = firstName;
    userItem.name.lastName = lastName;

    userItem.findOneOrCreate({"login": username, "email": email }, function (err, user) {
        return callback(err, user);
    });
}