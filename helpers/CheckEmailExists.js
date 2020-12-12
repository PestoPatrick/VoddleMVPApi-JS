const db = require("../models/db");
function CheckEmailExists(email){
    db.oneOrNone("Select * from voddle.tblusers Where email = $1", [email], (result) => {
        if (result == null) {
            return null
        } else {
            return result
        }
    }).catch(err => {
        throw err
    })
}

module.exports = CheckEmailExists;

