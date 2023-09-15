const jwt = require('jsonwebtoken');

const generateToken = (id) => { //generate Token use id and Secret or we say Sign of mine and exprie property in which period this token is become Expire
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

module.exports = generateToken;