const jwt = require("jsonwebtoken");

function JWTValidator(req, res, next) {
    let authHeader = req.headers.authorization;
    let userid = req.params.userid;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWTSecret, (err, tokeninfo) => {
            if (err) {
                return res.sendStatus(403);
            } else if (userid == tokeninfo.userid) {
                req.tokeninfo = tokeninfo;
                next();
            } else {
                res.sendStatus(401);
            }

        });
    } else {
        res.sendStatus(401).json({ahhh:'problem in jwt middleware'});
    }
}

module.exports = JWTValidator;
