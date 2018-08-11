var jwt = require('jsonwebtoken');
var config = require('../configs/config');
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = userController = () => {
    let create = (req, res) => {
        var user = new User(initUser(req.body));

        //save
        user.save(function(err, newUser) {
            if (err) {
                res.json({"code": false, "message": "Error to save"});
            } else {
                newUser.password = undefined;
                res.json({message: 'Save ok', data: newUser});
            }
        });
    };

    let info = (req, res) => {
        res.json({username: 'dongtranv', password: 'fsf27fsd23rh8sd7y786fds'});
    };

    let auth = (req, res) => {
        let response = {message: 'Logged in', username: req.user};

        if (req.accessToken){
            response.accessToken = req.accessToken;
        }

        res.json(response);
    };

    let unAuth = (req, res) => {
        res.send('Logout');
    };

    let authFacebook = (req, res) => {
        console.log(req.body);
        res.json({status: req.body.status})
    };

    let initUser = (body) => {
        return {
            username: body.username || null,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email || null,

            conversation: [],
            remember_token: [],
            created_at: new Date()
        }
    };

    return {create, info, auth, authFacebook, unAuth};
}