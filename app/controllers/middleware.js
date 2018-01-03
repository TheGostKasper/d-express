var jwt = require('jsonwebtoken');

module.exports = app => {

    app.all('/api/*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "access-control-allow-headers,access-control-allow-origin,content-type");
        next();
    })
    app.all('/login', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "access-control-allow-headers,access-control-allow-origin,content-type");
        next();
    })
    app.all('/api/*', (req, res, next) => {
        var token = req.headers.token;
        if (token) {
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    })
}
