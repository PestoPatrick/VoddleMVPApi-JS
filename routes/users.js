const express = require('express');
const router = express.Router();


const db = require("../models/db");
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt');
const JWTValidator = require("../helpers/JWTMiddleware");


/* GET all users */
router.get('/', function (req, res, next) {
    db.many('Select * from voddle.Tblusers')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
});

//get single user by id
router.get('/:userid', JWTValidator, (req, res, next) => {
    let userid = req.params.userid
    db.one('Select * FROM voddle.Tblusers WHERE userid = $1', userid)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(404).json({error: error});
        });
})


//delete user with certain id
router.delete('/:userid', (req, res) => {
    db.query('Delete * from voddle.Tblusers where userid = $1', req.params.userid)
        .then(result => {
            res.status(200).json({'message': 'user has been deleted'})
        }).catch((err) => {
        res.status(500).json({oopsiemessage: err})
    })
})

module.exports = router;
