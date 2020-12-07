var express = require('express');
const db = require("../models/db");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM voddle.Tblusers')
      .then(users => {
        console.log(users); // print user object;
        res.status(200).json(users);
      })
      .catch(error => {
        console.error(error);
        res.error();
      });
});


module.exports = router;
