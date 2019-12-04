module.exports.mongodbEndpoint = 'mongodb://localhost:27017';
module.exports.dbName = 'news-db';
module.exports.dbConnectionString = `${this.mongodbEndpoint}/${this.dbName}`;

module.exports.newsCollectionName = 'news';
module.exports.usersCollectionName = 'users';

module.exports.newsModelName = "News";
module.exports.userModelName = "User";