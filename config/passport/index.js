const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modModel = require('../../models/moderator');
const SHA256 = require("crypto-js/sha256");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    modModel.getID(id).then((user) => {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        modModel.getEmail(username).then((user) => {
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Email hoặc mật khẩu không hợp lệ.'));
            const hash = SHA256(password).toString();
            if (hash === user.password) {
                return done(null, user);
            }
            return done(null, false, req.flash('loginMessage', 'Email hoặc mật khẩu không hợp lệ.'));
        }).catch((err) => {
            return done(err);
        })
    }
));

module.exports = passport;