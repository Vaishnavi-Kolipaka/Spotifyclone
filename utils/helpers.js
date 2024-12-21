const jwt = require("jsonwebtoken");
const User = require("../models/user")

exports = {};

exports. getToken = async (email,User) =>{
    const token = jwt.sign({identifier: User._id},"thisKeyIsSupposedToBeSecret");
    return token;

};

module.exports = exports;