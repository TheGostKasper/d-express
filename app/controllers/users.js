var User = require('./../models/user');
var jwt    = require('jsonwebtoken'); 

module.exports = function (app) {
    app.post('/api/user', (req, res) => {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addUser(element);
            },this);
        else {
            addUser(req.body);
        }
        getUsers(res);
    });
    function addUser(user) {
        var _user = new User({
            name: user.name,
            username: user.username,
            location: user.location,
            password: user.password,
            email: user.email
        }).save(function (err) {
            if (err) throw err;
            console.log('User saved successfully!');
        });
    }


    app.get('/api/user', (req, res) => {
        getUsers(res);
    });
    function getUsers(res) {
        User.find({}, function (err, Users) {
            if (err) res.json({
                data: null,
                message: JSON.stringify(err)
            });
            res.json({
                data: Users,
                message: "200"
            });

        });
    }
    app.get('/api/user/:id', (req, res) => {
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "come from db"
            })
        });

    });

    app.put('/api/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "come from db"
            })
        });
    });

    app.delete('/api/user/:id', (req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, function (err,user) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "User removed successfully"
            })
        });
    })


    app.post('/api/login', (req, res) => {
        var _body = req.body;
        User.findOne({ email: _body.email, password: _body.password }
            , (err, user) => {
                if (err) res.json({
                    data: null,
                    message: "Authentication faild, Username or password is incorect"
                });

                const payload = {
                    user: user
                  };
                var token = jwt.sign(payload, app.get('superSecret'));

                res.json({
                    data: user,
                    token: token,
                    message: "Welcome back! "
                })
            })
    })
}