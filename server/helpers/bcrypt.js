const bcrypt = require('bcrypt');
const saltRounds = 10;


function encrypt (myPlaintextPassword){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash
}

function comparePass( myPlaintextPassword, hash){
    return bcrypt.compareSync(myPlaintextPassword, hash);
}

module.exports = { encrypt, comparePass }