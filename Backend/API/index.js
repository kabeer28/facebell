//use express library for easy API creation
//use con from database.js, this is the connection to the MySQL database
const express = require("express");
const db = require("./database.js");
const encrypt = require("./encrypt.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//create api
const api = express();
//enable use of json with express
api.use(express.json());

//account registration
api.post("/v1/account/register", async (req, res) => {
    if(!req.body.username || !req.body.email || !req.body.password) {
        return res.sendStatus(400);
    }

    //check if account already exists
    try {
        const results = await db.query('select email from accounts');
        
        //creates email array from database results
        var emails = new Array(results.length);
        for(var i = 0; i < results.length; i++) {
            emails[i] = results[i].email;
        }

        //check if email is already in use
        if(emails.includes(req.body.email)) {
            res.json({message:"Email already in use."});
            return res.status(400);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

    //create new account
    //hash password 
    const password = await encrypt.hash(req.body.password);
    
    try {
        await db.query(`INSERT INTO accounts (email, username, password, data) VALUES ('`+ req.body.email+`','`+req.body.username+`','`+password+`','{}')`);
        res.json({message:"Account Created."});
        return res.status(200);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

//account login
api.post("/v1/account/login", async (req, res) => {
    //check if account exists
    try {
        const results = await db.query('SELECT * FROM accounts WHERE email = ?', [req.body.email]);
        const account = results[0];

        //check if account exists and if password is correct
        if(!account || !await encrypt.compare(req.body.password, account.password)) {
            res.json({message:"Invaild email or password."});
            return res.status(418);
        }

        //create jwt and give to user
        const token = jwt.sign({id:account.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
        return res.status(200); 
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

//account deletion
api.delete("/v1/account/delete", async (req, res) => {
    //verify correct email and password
    try { 
        const results = await db.query("SELECT * FROM accounts WHERE email = ?", [req.body.email]);
        const account = results[0];

        //check if account exists and if password is correct
        if(!account || !await encrypt.compare(req.body.password, account.password)) {
            res.json({message:"Invaild email or password."});
            return res.status(400);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

    try {
        await db.query("DELETE FROM accounts WHERE email = ?", [req.body.email]);
        res.json({message:"Account deleted."});
        return res.send(200);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}); 

/*  add friends to an account
*
*   request requireds token, email, friend name, and path to image
*
*/
api.post("/v1/account/friend/add", async (req, res) => {
    try {
        //check jwt token validity
        if(!jwt.verify(req.body.token, process.env.JWT_SECRET)) {
            return res.sendStatus(401);
        }
    
        //make call to rekognition to get facial data

        //store data into database
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

api.listen(3000, () => console.log("API server is running..."));