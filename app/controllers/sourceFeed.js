var SourceFeed = require('./../models/sourceFeed');

module.exports = function (app) {
    app.post('/api/source', function (req, res) {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addSourceFeed(element);
            }, this);
        else {
            addsourceFeed(req.body);
        }
        getSourcesFeed(res);
    });


    function addSourceFeed(sourceFeed) {
        var _sourceFeed = new SourceFeed({
            name: src.name,
            url: src.url
        }).save(function (err) {
            if (err) throw err;
            console.log('Source saved successfully!');
        });
    }
    function getSourcesFeed(res) {
        SourceFeed.find({}, function (err, srcs) {
            if (err) res.json({
                data: null,
                message: JSON.stringify(err)
            });
            res.json({
                data: srcs,
                message: "200"
            });
        });
    }
    app.get('/api/source', function (req, res) {
        SourceFeed.find({}, function (err, sourceFeeds) {
            if (err) res.send({
                data: null,
                message: JSON.stringify(err)
            });
            res.send({
                data: sourceFeeds,
                message: "came from db"
            });

        });

    });

    app.get('/api/source/:id', function (req, res) {
        SourceFeed.find({ _id: req.params.id }, function (err, srcs) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: srcs,
                message: "come from db"
            })
        });

    });

    app.put('/api/source/:id', function (req, res) {
        SourceFeed.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, srcs) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: srcs,
                message: "come from db"
            })
        });
    });

    app.delete('/api/source/:id', function (req, res) {
        SourceFeed.findOneAndRemove({ _id: req.params.id }, function (err, srcs) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: srcs,
                message: "Source removed successfully"
            })
        });
    })
}