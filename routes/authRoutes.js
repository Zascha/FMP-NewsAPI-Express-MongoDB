const logger = require('../modules/logger').logger;

module.exports = function (router, passport) {
    router.get('/profile', isLoggedIn, (req, res) => {
        res.status(200).send("Profile page.");
    });

    router.get('/signup', (req, res) => {
        res.status(200).send("Signup page.");
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/login', (req, res) => {
        res.status(200).send("Login page.");
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/logout', function (req, res) {
        req.logout();
        res.status(200).send("Successfully logged out. Redirect to 'Home' page.");
        //res.redirect('/home');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.status(401).send("Not authorized");
    }
}