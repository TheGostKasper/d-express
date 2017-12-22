var _ = require('lodash');

module.exports = function (app) {

    _cats = [];

    app.post('/cat', function (req, res) {
        req.body.forEach(function (element) {
            _cats.push(element);
        }, this);
        res.json({ message: 'cat created successfully', data: _cats });
    });


    app.get('/cat', function (req, res) {
        res.send(_cats);
    });

    app.get('/cat/:id', function (req, res) {
        res.send({
            data: _.find(_cats, function (e) {
                return e.id = req.params.id;
            })
        })
    });

    app.put('/cat/:id', function (req, res) {
        var index = _.findIndex(_cats, function (e) {
            return e.id == req.params.id;
        });
        _.merge(_cats[index], req.body);
        res.json({ message: 'cat created successfully', data: _cats[index] });
    });

    app.delete('/cat/:id', function (req, res) {
        var index = _.findIndex(_cats, function (e) {
            return e.id == req.params.id;
        });
        _.remove(_cats, function (cat) {
            return cat.id === req.params.id
        });
        res.json({ info: 'cat removed successfully' });
    })


}