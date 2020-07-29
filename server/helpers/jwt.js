const jwt = require('jsonwebtoken');

function jwtSign(data){
    return jwt.sign(data, process.env.SECRET);
}

function jwtVerify(token){
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { jwtSign , jwtVerify}