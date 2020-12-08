let router = express.Router();
const express = require('express');
const db = require("../models/db");

// import {v4 as uuidv4} from 'uuidv4';
// import bcrypt from 'bcrypt';

/* GET all users */
router.get('/', function(req, res, next) {
    db.many('Select * from voddle.Tblusers')
        .then(users => {
        res.status(200).json(users)
    })
        .catch(err => {
            res.error()
        })
});

//get single user by id
router.get('/:userid', (req,res,next) => {
  db.one('Select * FROM voddle.Tblusers WHERE Userid = $1', req.params.userid)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.error();
      });
})

router.post('/', (req,res) => {
    db.insert(undefined, undefined, undefined)
})

//delete user with certain id
router.delete('/:userid', (req, res) => {
    db.query('Delete * from voddle.Tblusers where = $1', req.params.userid)
        .then(result => {
            res.status(200).json({'message': 'user has been deleted'})
        })
})

module.exports = router;
