var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter({
    "consumerKey": "A8riRdoQTuGQjOKwNyUJV38V3",
    "consumerSecret": "ouWcsXJkM6sLTUCB3hQdOEnsrkRC8Vzq0yzmZQ2eUecdycqqsh",
    "accessToken": "1043265528-1kIDvomqbQW5DrZBt79v4T5Lw8YzJHRYVYq7EOM",
    "accessTokenSecret": "5gXXAlI7oYtSHvHEHZe4GYdPKMRbQkNH8aSLcUKAGSCpo",
    "callBackUrl": ""
});



module.exports = function (app) {
    app.get('/api/twitter', (req, res) => {
        twitter.getUserTimeline({ screen_name: req.params.screen_name, count: 20 }, err => {
            console.log(err)
        }, (response) => {
            res.json({
                data: JSON.parse(response),
                message: "200"
            });
        });
    });

    app.post('/api/twitter/DM', (req, res) => {
        twitter.sendDM('/direct_messages/new.json', {
            screen_name: req.body.screen_name,
            text: req.body.text
        }, err => {
            res.json({
                data: err,
                message: "401"
            });
        }, response => {
            res.json({
                data: JSON.parse(response),
                message: "200"
            });
        });
    });
}