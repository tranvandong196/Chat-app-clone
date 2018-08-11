var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/userController')();
const AuthController = require('../app/controllers/authController')();
const {connectMongoDb} = require('../app/controllers/dbController');

connectMongoDb();
/* GET users listing. */
router.post('/register', UserController.create);
router.post('/login', AuthController.authenticate, UserController.auth);
router.get('/logout', AuthController.unAuthenticate, UserController.unAuth);
router.get('/info', AuthController.isAuthenticated, UserController.info);
router.get('/auth/jwt', AuthController.isAuthenticated, UserController.auth);

router.get('/auth/facebook', AuthController.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', AuthController.authenticate('facebook'));

const scope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];

router.get('/auth/google', AuthController.authenticate('google', {scope: scope}));
router.get('/auth/google/callback', AuthController.authenticate('google'));

module.exports = router;
