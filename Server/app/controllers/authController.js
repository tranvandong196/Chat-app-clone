var config = require('../configs/config');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

const passport = require('../models/passport');


module.exports = authController = () => {
    let authenticate = (request, scope = null) => {
        if (request === 'jwt') {
            return verifyJWT;
        }

        if (request === 'facebook' || request === 'google') {
            if (scope) {
                return passport.authenticate(request, scope)
            } else {
                return (req, res, next) => {
                    passport.authenticate(request, verifySocialProfile(req, res, next))(req, res, next);
                }
            }
        }

    };

    let verifySocialProfile = (req, res, next) => (profile) => {
        const email = profile.email ? profile.email : profile.emails[0].value;
        User.findOne({email: email}, (err, user) => {
            if (err) return res.json({error: err.message});
            if (user) {
                return res.redirect('http://localhost:4200/username=' + user.username);
            } else {
                const newUser = new User({
                    username: email,
                    email: email,
                    created_at: new Date().getTime()
                });

                newUser.save(err2 => {
                    console.log('Saved user: ', email);
                    return res.redirect('http://localhost:4200/saved-user-to-database');
                });
            }
        })
    };

    let verifyJWT = (req, res, next) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (!user) {
                res.json({error: 'User is not exist'})
            } else if (user) {
                let payload = {username: req.body.username};
                let jwtToken = jwt.sign(payload, config.jwtSecret, {expiresIn: 300});

                req.accessToken = 'JWT ' + jwtToken;
                next();
            } else {
                res.json({error: 'Login Error'})
            }
        })
    };

    let isAuthenticated = (req, res, next) => {
        if (!hasJwtToken(req)) {
            return res.status(401).json({status: 401, message: 'Unauthorized user!'});
        } else {
            const jwtToken = req.get('authentication').split(' ')[1];
            jwt.verify(jwtToken, config.jwtSecret, function (err, payload) {

                if (err) {
                    return res.status(401).json({status: 401, message: 'Unauthorized user!'});
                } else {

                    console.log('~/app/controllers/authController.js');
                    console.log("decoder: ", payload);
                    // find
                    User.findOne({'username': payload.username}, function (err, user) {
                        if (user) {
                            req.user = user;
                            next();
                        } else {
                            res.status(401).json({status: 401, message: 'Unauthorized user!'});
                        }
                    })
                }
            });
        }
    };

    let hasJwtToken = (req) => {
        return req.get('authentication') && req.get('authentication').split(' ')[0] === 'JWT'
    };

    return {authenticate, isAuthenticated}
}