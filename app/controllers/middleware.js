var jwt = require('jsonwebtoken');
module.exports = app => {
    // app.all('/api/*', (req, res, next) => {
    //     console.log(`req${JSON.stringify(req.headers)}`);
    //     // res.header('Access-Control-Allow-Credentials', true);
    //     res.header("Access-Control-Allow-Origin", "*");
    //     // res.header("Access-Control-Allow-Methods",'*');
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //     next();
    // })

    // app.all('/login', (req, res, next) => {
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", '*');
    //     res.header("Access-Control-Allow-Headers", "*");
    //     next();
    // })
    app.all('/api/*', (req, res, next) => {
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
