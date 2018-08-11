const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: "506278836478647",
        clientSecret: "30b837a7f595ceb1a3a86efd2639a17c",
        callbackURL: "http://localhost:3000/users/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email', 'gender']
    },
    function (accessToken, refreshToken, profile, done) {
        return done(profile._json);
    }
));

passport.use(new GoogleStrategy({
        clientID: "892807079348-lqgh0b1i43kr1rud0kk5km0upvc4pnbc.apps.googleusercontent.com",
        clientSecret: "Ywfi7k3h3QvAYH629allR-OC",
        callbackURL: "http://localhost:3000/users/auth/google/callback"

    },
    function (token, tokenSecret, profile, done) {
        return done(profile._json);
    }
));

module.exports = passport;
