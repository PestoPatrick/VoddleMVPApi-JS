const express = require('express');
const router = express.Router();

const db = require("../models/db");
const JWTValidator = require("../helpers/JWTMiddleware");

router.get('/:userid', JWTValidator,function (req, res, next) {
    let userid = req.params.userid
    db.one('Select * from voddle.tblusers WHERE userid = $1', userid)
        .then(userinfo => {
            res.status(200).json(userinfo)
        })
        .catch(err => {
            res.sendStatus(500)
        })
});

module.exports = router;
