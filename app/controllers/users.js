const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/user', (req, res) => {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addUser(element);
            }, this);
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
        User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
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


    app.post('/login', (req, res) => {
        var _body = req.body;
        User.findOne({ email: _body.email, password: _body.password }
            , (err, user) => {
                if (err || !user) return res.json({
                    data: null,
                    message: "Authentication faild, Username or password is incorect"
                });
                else {
                    const payload = {
                        user: user
                    };
                    var token = jwt.sign(payload, app.get('superSecret'));
                    return res.json({
                        data: user,
                        token: token,
                        message: "Welcome back! "
                    })
                }

            })
    })

    app.post('/api/track', (req, res) => {
        let fd;
        try {
            fd = fs.openSync('./message.txt', 'a');
            fs.appendFileSync('./message.txt', req.body.message, 'utf8');
        } catch (err) {
            /* Handle the error */
        } finally {
            if (fd) {
                res.send({
                    message: 'Successfully saved'
                })
                fs.closeSync(fd);
            }
        }
    });
    app.post('/api/upload/image', (req, res) => {
        let fd;
        try {
            // fd = fs.openSync('./images/message.png', 'a');
            //const name = req.body.name + '.' + req.body.type;
            fs.appendFileSync('./images/' + 'name.txt', req.body.avatar, 'utf8');
        } catch (err) {
            console.log(err);
            /* Handle the error */
        } finally {
            //if (fd) {
            res.send({
                message: 'Successfully saved'
            })
            fs.closeSync(fd);
        }
        //}
    })
}