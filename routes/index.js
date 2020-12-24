const express = require('express');
const db = require("../models/db");
const router = express.Router();

/* GET home page. */
router.get('/',function(req, res) {
  db.any('SELECT * FROM voddle.Tblusers')
      .then(users => {
        console.log(users); // print user object;
        res.status(200).json(users);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
});


module.exports = router;
