const google = require('googleapis');
const customsearch = google.customsearch({
    version: 'v1',
    auth: "AIzaSyCUVE6IwH9T4pdiFlhRu0OaWN-U5QNbmgg"
});
const youtube = google.youtube({
    version: 'v3',
    auth: "AIzaSyCUVE6IwH9T4pdiFlhRu0OaWN-U5QNbmgg"
});

module.exports = function (app) {
    app.post('/api/youtube/search', function (req, res) {
        youtube.search.list({
            part: 'snippet',
            q: req.body.query,
            maxResults: 10,
            order: "viewCount"
        }, function (err, data) {
            if (err) res.json({
                data: null,
                message: err
            });
            res.json({
                data: data,
                message: "200"
            });

        });
    });
    app.post('/api/google/search', (req, res) => {
        customsearch.cse.list({
            cx: "001880847781619757932:ca5hv1b7any",
            q: req.body.query,
            maxResults: 10,
            order: "viewCount"
        }, (err, data) => {
            if (err) res.json({
                data: null,
                message: err
            });
            res.json({
                data: data,
                message: "200"
            });
        });
    })
}