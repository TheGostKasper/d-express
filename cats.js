var _ = require('lodash');

module.exports = function (app) {

    _cats = [];
    app.all('/api/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    app.post('/api/cat', function (req, res) {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                _cats.push(element);
            }, this);
        else _cats.push(req.body);
        res.json({ message: 'cat created successfully', data: _cats });
    });


    app.get('/api/cat', function (req, res) {
        res.send(_cats);
    });

    app.get('/api/cat/:id', function (req, res) {
        res.send({
            data: _.find(_cats, function (e) {
                return e.id = req.params.id;
            })
        })
    });

    app.put('/api/cat/:id', function (req, res) {
        var index = _.findIndex(_cats, function (e) {
            return e.id == req.params.id;
        });
        _.merge(_cats[index], req.body);
        res.json({ message: 'cat created successfully', data: _cats[index] });
    });

    app.delete('/api/cat/:id', function (req, res) {
        // var index = _.findIndex(_cats, function (e) {
        //     return e.id == req.params.id;
        // });
        _cats = _.remove(_cats, function (cat) {
            return cat.id != req.params.id
        });
        res.json({ info: 'cat removed successfully' });
    })


}