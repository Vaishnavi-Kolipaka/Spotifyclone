const express = require('express');
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport")
const app = express();
const User = require("./models/user");
const authRoutes = require("./routes/auth");
require("dotenv").config()
const port = 3000;

app.use(express.json());


mongoose.connect(
    "mongodb+srv://Vaishnavi:"+ process.env.MONGO_PASSWORD+"@sample.qg6in.mongodb.net/?retryWrites=true&w=majority&appName=Sample",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((x) => {
    console.log("Connected to Mongo");
}).catch((err) =>{
console.log("Connection error");
})


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyisSupposedToBeSecrete';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/",(req,res)=>{

    res.send("Hello World");
});
app.use("/auth",authRoutes);
app.listen(port,() => {
    console.log(`App is running on port : http://localhost:${port}`);
});