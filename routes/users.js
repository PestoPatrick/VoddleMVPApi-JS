const express = require('express');
const router = express.Router();


const db = require("../models/db");
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt');


/* GET all users */
router.get('/', function (req, res, next) {
    db.many('Select * from voddle.Tblusers')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.error()
        })
});

//get single user by id
router.get('/:userid', (req, res, next) => {
    let userid = req.params.userid;
    db.one('Select * FROM voddle.Tblusers WHERE userid = $1', userid)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(404).json({error: error});
        });
})

router.post('/', (req, res) => {
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
                    return err;
                }

            })
                .catch(err => {
                    res.status(500).json({message: err})
                })
        }
    })
})


//delete user with certain id
router.delete('/:userid', (req, res) => {
    db.query('Delete * from voddle.Tblusers where userid = $1', req.params.userid)
        .then(result => {
            res.status(200).json({'message': 'user has been deleted'})
        }).catch((err) => {
            res.status(500).json({oopsiemessage:err})
        })
})

module.exports = router;
