const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstname:{
        type: String,
        requires: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        requires: true,
    },
    username:{
        type: String,
        requires: true,
    },

});

const UserModel = mongoose.model("User",User);

module.exports =UserModel;