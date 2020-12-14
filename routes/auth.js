const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const db = require("../models/db");
const {v4: uuidv4} = require('uuid')


/* GET users listing. */
router.get('/', (req, res) => {
    res.send('<b> <p> Arthur Christmas is filming his videos and posting them here! </p> </b>');
});

router.post('/', (req, res) => {
    let email = req.body.Email;
    let password = req.body.Password;


    db.oneOrNone("Select * from voddle.tblusers Where email = $1", [email])
        .then((QResult) => {
            if (QResult == null) {
                res.status(404).json({message: 'Email is not associated with an account'})
            }

            bcrypt.compare(password, QResult.passwordhash, (err, result) => {
                let accessJWT;
                // result == true
                if (result == true) {
                    accessJWT = jwt.sign({
                        username: QResult.username,
                        userid: QResult.userid,
                    }, process.env.JWTSecret)
                    console.log(accessJWT)
                    res.status(200).json({message: accessJWT})
                }
            })

        })

    // res.status(500).json({message:'Theres been a terrible mistake'})

})

module.exports = router;
