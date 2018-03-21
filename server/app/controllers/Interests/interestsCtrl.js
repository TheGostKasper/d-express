var Interest = require('./interest');
var SourceFeed = require('./../Feeds/sourceFeed');
// import * as _ from 'lodash';

module.exports = function (app) {
    app.post('/api/interest', function (req, res) {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addInterest(element);
                if (element.sources)
                    addSources(element.sources)
            }, this);
        else {
            addInterest(req.body);
            if (req.body.sources)
                addSources(req.body.sources)
        }
        getInterests(res);
    });
    function getInterests(res) {
        Interest.find({}, function (err, ints) {
            if (err) res.json({
                data: null,
                message: JSON.stringify(err)
            });
            res.json({
                data: ints,
                message: "200"
            });
        });
    }
    function addSources(srcs) {
        srcs.forEach(src => {
            var _interest = new SourceFeed({
                name: src.name,
                url: src.url,
            }).save(function (err) {
                if (err) throw err;
                console.log('User saved successfully!');
            });
        }, this);
    }
    function addInterest(interest) {
        var _interest = new Interest({
            name: interest.name,
            description: interest.description,
            imageUrl: interest.imageUrl,
            gender: interest.gender,
            type: interest.type,
            hits: 1,
            sources: interest.sources
        }).save(function (err) {
            if (err) throw err;
            console.log('Interest added successfully!');
        });
    }

    app.get('/api/interest', function (req, res) {
        Interest.find({}, function (err, interests) {
            if (err) res.send({
                data: null,
                message: JSON.stringify(err)
            });
            res.send({
                data: interests,
                message: "came from db"
            });

        });

    });

    app.post('/api/interest/sources:id', (req, res) => {
        Interest.find({ _id: req.params.id }, req.body, (err, interests) => {
            if (err) res.send({
                data: null,
                message: JSON.stringify(err)
            });
            let sources = interests.sources;
            sources.push(req.body);

            Interest.findOneAndUpdate({ _id: req.params.id }, sources, (__err, __interests) => {
                if (__err) res.send({
                    data: null,
                    message: JSON.stringify(__err)
                });
                res.send({
                    data: __interests,
                    message: "Updated successfully"
                })
            });
        });
    });

    app.put('/api/interest/:id', (req, res) => {
        Interest.findOneAndUpdate({ _id: req.params.id }, req.body, (err, interests) => {
            if (err) res.send({
                data: null,
                message: JSON.stringify(err)
            });
            res.send({
                data: interests,
                message: "Updated successfully"
            })
        });
    });

    app.put('/api/interest/sources/:id', (req, res) => {
        Interest.findOneAndUpdate({ _id: req.params.id }, req.body, (__err, __interests) => {
            if (__err) res.send({
                data: null,
                message: JSON.stringify(__err)
            });
            res.send({
                data: __interests,
                message: "Updated successfully"
            })
        });
    });


    app.get('/api/interest/:id', function (req, res) {
        Interest.find({ _id: req.params.id }, function (err, user) {
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

    app.put('/api/interest/:id', function (req, res) {
        Interest.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
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

    app.delete('/api/interest/:id', function (req, res) {
        Interest.findOneAndRemove({ _id: req.params.id }, function (err, ints) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: ints,
                message: "cat removed successfully"
            })
        });
    })


    // get top 10 records
    app.post('/api/top/interest', (req, res) => {
        const page = req.body;
        Interest.find({})
            .sort({ hits: -1 })
            .skip(page.pageSize * (page.pageNumber - 1))
            .limit(page.pageSize)
            // .select({ name: 1, description: 1 ,imageUrl:1})
            .select("_id name description")
            .exec((err, ints) => {
                if (err) res.send({
                    data: null,
                    err: err
                });
                res.send({
                    data: ints,
                    message: "Top 5 interests"
                })
            })
    });

}