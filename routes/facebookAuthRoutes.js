module.exports = function (router, passport) {
    router.get('/auth/facebook', passport.authenticate('facebook-login'));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook-login', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
}