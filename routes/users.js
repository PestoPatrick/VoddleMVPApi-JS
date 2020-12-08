const express = require('express');
let router = express.Router();


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
router.get('/:userId', (req, res, next) => {
    db.one('Select * FROM voddle.Tblusers WHERE Userid = $1', req.params.userid)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.error();
        });
})

router.post('/', (req, res) => {
    let username = req.body.Username;
    let userid = uuidv4();
    let email = req.body.Email;
    let password = req.body.Password;
    let passwordHash;
    bcrypt.hash('password', 16, (err, hash) => {
        if (hash) {
            passwordHash = hash;
        } else {
            return err;
        }

    })
    // db.insert()
})

//delete user with certain id
router.delete('/:userid', (req, res) => {
    db.query('Delete * from voddle.Tblusers where = $1', req.params.userid)
        .then(result => {
            res.status(200).json({'message': 'user has been deleted'})
        })
})

module.exports = router;
