const User = require('./user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {


    app.post('/login', (req, res) => {
        var _body = req.body;
        User.findOne({ email: _body.email, password: _body.password }
            , (err, user) => {
                if (err || !user) {
                    return res.json({ data: null, message: "Authentication faild, Username or password is incorect" });
                } else {
                    return res.json({ data: user, token: getToken(user), message: "Welcome back! " })
                }
            })
    })
    app.post('/signUp', (req, res) => {
        getUserAsync({ email: req.body.email }).then((e_user) => {
            if (e_user.length > 0) {
                res.send({ data: null, message: "Email already exist, try another one!" });
            } else {
                addUserAsync(req.body).then((response) => {
                    res.send({
                        data: response, token: getToken(response), message: "User added successfully"
                    })
                });

            }
        }).catch(err => { });
    });
    app.post('/api/user', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addUserAsync(element);
            }, this);
        else {
            addUserAsync(req.body);
        }
        res.send({ data: req.body, message: "User added successfully" })
    });
    app.get('/api/user', (req, res) => {
        getUsers(res);
    });
    app.get('/api/user/:id', (req, res) => {
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: user, message: "User found" })
            }
        });

    });
    app.put('/api/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, user) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: user, message: "user updated successfully" })
            }

        });
    });
    app.delete('/api/user/:id', (req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: user, message: "User removed successfully" })
            }
        });
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
            fs.appendFileSync('./images/' + 'name.txt', req.body.avatar.changingThisBreaksApplicationSecurity, 'utf8');
        } catch (err) {
            console.log(err);
            /* Handle the error */
        } finally {
            //if (fd) {
            res.send({
                message: 'Successfully saved'
            })
            //fs.closeSync(fd);
        }
        //}
    });
    function getToken(user) {
        const payload = {
            user: user
        };
        return jwt.sign(payload, app.get('superSecret'));
    }
    async function addUserAsync(user) {
        let _results;
        await new User({
            name: user.name,
            location: user.location,
            password: user.password,
            email: user.email
        }).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }
    function getUsers(res) {
        User.find({}, function (err, Users) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: Users, message: "200" });
            }
        });
    }
    async function getUserAsync(option) {
        let _data;
        await User.find(option).exec().then((data) => {
            _data = data;
        }).catch(err => {
            _data = null;
        });
        return _data;
    }

}