var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('<b> <p> Arthur Christmas is filming his videos and posting them here! </p> </b>');
});

module.exports = router;
