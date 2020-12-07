var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:userid', (req,res,next) => {
  db.one("Select * FROM voddle.Tblusers WHERE Userid = $1", req.params.userid)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.error();
      });
})

module.exports = router;
