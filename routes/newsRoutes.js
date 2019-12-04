const newsQuery = require('../queries/newsQuery');

module.exports = function(router){
    router.get("/news", (req, res) => {
        newsQuery.getAll((err, news) => {
            if (err) {
                logger.error(err);
                return res.status(500).send(err.message);
            };
            res.send(news);
        })
    });
    
    router.get('/news/:id', (req, res) => {
        var newsId = req.params.id;
        newsQuery.getById(newsId, (err, news) => {
            if (err) {
                logger.error(err);
                return res.status(500).send(err.message);
            };
            res.send(news);
        })
    });
    
    router.put('/news', isLoggedIn, (req, res) => {
        var news = req.body;
        newsQuery.addNews(news, (err) => {
            if (err) {
                logger.error(err);
                return res.status(500).send(err.message);
            };
            res.sendStatus(200);
        })
    });
    
    router.post('/news', isLoggedIn, (req, res) => {
        var news = req.body;
        newsQuery.updateNews(news, (err) => {
            if (err) {
                logger.error(err);
                return res.status(500).send(err.message);
            };
            res.sendStatus(200);
        })
    });
    
    router.delete('/news/:id', isLoggedIn, (req, res) => {
        var newsId = req.params.id;
        newsQuery.deleteNews(newsId, (err) => {
            if (err) {
                logger.error(err);
                return res.status(500).send(err.message);
            };
            res.sendStatus(200);
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.status(401).send("Not authorized");
    }
};