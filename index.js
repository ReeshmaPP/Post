const express = require('express')
const bodyParser = require('body-parser')
const user = require("./routes/user"); //new addition
const posts = require("./routes/posts")
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
//app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req,res)=> {
res.json({message: "APT Working"});
});

/**
 * Router Middleware
 * Router - /user/*
 * Router - /posts/*
 * Method - *
 */
 app.use("/user", user);
 app.use("/posts", posts);

app.listen(PORT, (req, res)=>{
    console.log(`Server Started at PORT ${PORT}`);
});
