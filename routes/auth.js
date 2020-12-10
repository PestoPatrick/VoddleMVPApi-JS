const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('<b> <p> Arthur Christmas is filming his videos and posting them here! </p> </b>');
});

router.post('/', (req,res,next) => {

})

module.exports = router;
