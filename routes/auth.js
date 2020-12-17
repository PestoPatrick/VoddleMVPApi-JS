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

router.post('/login', (req, res) => {
    let email = req.body.Email;
    let password = req.body.Password;

    db.one("Select * from voddle.tblusers Where email = $1", [email])
        .then((QResult) => {
            bcrypt.compare(password, QResult.passwordhash, (err, result) => {
                let accessJWT;
                if (result == true) {
                    accessJWT = jwt.sign({
                        username: QResult.username,
                        userid: QResult.userid,
                        jwtid:uuidv4(),
                        expiresIn:"7d",
                    }, process.env.JWTSecret)
                    console.log(accessJWT)
                    res.status(200).json({message: accessJWT})
                } else {
                    res.status(404).json({message: 'Error with email or password'})
                }
            })
        })
    .catch(err => {
        res.status(500).json({message: 'Error with email or password'})
    })


})

router.post('/register', (req, res) => {
    let username = req.body.Username;
    let userid = uuidv4();
    let email = req.body.Email;
    let password = req.body.Password;
    let passwordHash;

    db.manyOrNone('Select * from voddle.tblusers where email = $1', email).then((r) => {
        if (r.length >= 1) {
            res.status(409).json({message:'The email is already connected to another account'})
        } else {
            bcrypt.hash(password, 16, (err, hash) => {
                if (hash) {
                    passwordHash = hash;
                    db.none('Insert into voddle.Tblusers(userid,username,email,passwordhash) VALUES ($1, $2, $3, $4)', [userid, username, email, passwordHash]).then(() => {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: 'Inserted new user',
                                Userid: userid,
                                Username: username,
                                Email: email,
                                PasswordHash: passwordHash
                            })
                    }).catch((err) => {
                        res.status(404).send(err);
                    })
                } else {
                    res.status(400).json({message:'Incorrect email or password'})
                }

            })
                .catch(err => {
                    res.status(500).json({message: err})
                })
        }
    })
})

module.exports = router;
