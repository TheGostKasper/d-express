var jwt = require('jsonwebtoken');
module.exports = app => {
    app.all('/v1/',(req, res, next) => {
        console.log("fuck");
        next();
    })
    app.all('/api/*', (req, res, next) => {
        console.log("fuck");
        
        var token = req.headers.authorization;
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
