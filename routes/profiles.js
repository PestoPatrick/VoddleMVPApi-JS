const express = require('express');
const router = express.Router();

const db = require("../models/db");
const JWTValidator = require("../helpers/JWTMiddleware");

router.get('/', JWTValidator,function (req, res, next) {
    let email = req.body.Email
    db.one('Select * from voddle.tblusers WHERE email = $1', [email])
        .then(userinfo => {
            res.status(200).json(userinfo)
        })
        .catch(err => {
            res.error()
        })
});

module.exports = router;
