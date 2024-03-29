const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modModel = require('../../models/moderator');
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    modModel.getID(id).then((user) => {
        done(null, user);
    }).catch(function (err) {

    })
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    (username, password, done) => {
        modModel.getEmail(username).then((user) => {
            if (!user)
                return done(null, false);
            bcrypt.compare(password, user.password, (err, res) => {
                if (err)
                    return done(null, false);
                if (res) {
                    return done(null, user);
                }
                return done(null, false);
            });
        }).catch((err) => {
                return done(err);
            })
    }
));

module.exports = passport;