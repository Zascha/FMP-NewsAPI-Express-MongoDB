const News = require('../schemas/newsSchema');

module.exports.getAll = function(callback){
    News.find({}, (err, news) => {
        return callback(err, news);
    });
}

module.exports.getById = function(id, callback){
    News.findById(id, (err, news) => {
        return callback(err, news);
    });
}

module.exports.addNews = function(data, callback){
    var newsItem = new News(data);
    newsItem.save(function (err) {
        return callback(err);
    });
}

module.exports.updateNews = function(data, callback){
    News.findOneAndUpdate({"_id": data._id }, data, function (err, news) {
        return callback(err);
    });
}

module.exports.deleteNews = function(id, callback){
    News.findOneAndDelete({"_id": id }, function (err, news) {
        return callback(err);
    });
}