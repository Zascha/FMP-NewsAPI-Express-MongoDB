const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const usersQuery = require('../queries/usersQuery');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        usersQuery.findUserById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            var user = req.body;
            process.nextTick(function () {
                if (!user || !user.login) {
                    req.flash('signupResult', 'Invalid passed user data.');
                    return done(null, false, req);
                }

                usersQuery.checkLoginIsVacant(user.login, (err, isVacant) => {
                    if (err) {
                        return done(err);
                    }
                    if (!isVacant) {
                        req.flash('signupResult', 'The email is already taken.');
                        return done(null, false, req);
                    }
                    else {
                        usersQuery.createUser(user, (err, createdUser) => {
                            return done(err, createdUser);
                        });
                    }
                });
            });
        }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, login, password, done) {
            usersQuery.findUserByLogin(login, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginResult', 'The user does not exist.'));
                }
                if (!user.isPasswordValid(password)) {
                    return done(null, false, req.flash('loginResult', 'Invalid password.'));
                }

                return done(null, user);
            });
        }));

    passport.use('facebook-login', new FacebookStrategy({
        clientID: 'FACEBOOK_CLIENT_ID',
        clientSecret: 'FACEBOOK_CLIENT_SECRET',
        callbackURL: 'FACEBOOK_CALLBACK_URL',
        profileFields: ['username', 'email', 'first_name', 'last_name']
    },
        function (accessToken, refreshToken, profile, done) {
            var username = profile.username;
            var email = profile.email;
            var firstName = profile.last_name;
            var lastName = profile.last_name;

            usersQuery.findOrCreateFacebookUser(username, email, firstName, lastName, (err, user) =>{
                if (err) { return done(err); }
                done(null, user);
            });
        }
    ));
}