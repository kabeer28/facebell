//use express library for easy API creation
//use con from database.js, this is the connection to the MySQL database
const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const db = require("./database.js");
const encrypt = require("./encrypt.js");
const rekog = require("./rekognition.js");

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
            return res.json({message:"Email already in use."});
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    //create new account
    //hash password 
    const password = await encrypt.hash(req.body.password);
    const json = "{ \"friends\": [] }";
    
    try {
        await db.query(`INSERT INTO accounts (email, username, password, data) VALUES (?, ?, ?, ?)`, [req.body.email, req.body.username, password, json]);
        return res.json({message:"Account Created."});
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
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
            return res.json({message:"Invaild email or password."});
        }

        //create jwt and give to user
        const token = jwt.sign({id:account.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({token}); 
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
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
            return res.json({message:"Invaild email or password."});
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    try {
        await db.query("DELETE FROM accounts WHERE email = ?", [req.body.email]);
        return res.json({message:"Account deleted."});
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}); 

/*  add friends to an account
*
*   request requireds token, email, friend name, and path to image  
*
*/
api.post("/v1/account/friend/add", async (req, res) => {
    try {
        //extract email from jwt
        const email = jwt.verify(req.body.token, process.env.JWT_SECRET).id;

        //check jwt token validity 
        if(!jwt.verify(req.body.token, process.env.JWT_SECRET) || email != req.body.email) {
            return res.sendStatus(401);
        }

        if(!fs.existsSync("./friends/" + req.body.path )) {
            return res.sendStatus(400);
        }

        //read user json
        const data = await db.query("SELECT data FROM accounts WHERE email = ?", [req.body.email]);
        const json = JSON.parse(data[0].data);
        
        //add friend to json array
        const element = {name:req.body.name, path:req.body.path};
        json.friends.push(element);

        //update database
        await db.query("UPDATE accounts SET data = ? WHERE email = ?", [JSON.stringify(json), req.body.email]);
    
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

/*  removes friends from an account
*
*   request requireds token, email, and friend name
*
*/
api.delete("/v1/account/friend/remove", async (req, res) => {
    try {
        //get id (email) from jwt
        const jwt_result = jwt.verify(req.body.token, process.env.JWT_SECRET)
        const email = jwt_result.id;

        //check jwt validity
        if(!jwt_result || email != req.body.email) {
            return res.sendStatus(401);
        }

        //check if friend exists
        //read user json
        const data = await db.query("SELECT data FROM accounts WHERE email = ?", [req.body.email]);
        const json = JSON.parse(data[0].data);

        //remove friend from list
        const filtered_friends = json.friends.filter(friend => friend.name !== req.body.name);
        json.friends = filtered_friends;

        //update the database
        await db.query("UPDATE accounts SET data = ? WHERE email = ?", [JSON.stringify(json), req.body.email]);

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

/*  get list of friends and face images from an account
*
*   request requireds token and email
*
*/
api.get("/v1/account/friend/list", async (req, res) => {
    try {
        //get id (email) from jwt
        const jwt_result = jwt.verify(req.body.token, process.env.JWT_SECRET)
        const email = jwt_result.id;

        //check jwt validity
        if(!jwt_result || email != req.body.email) {
            return res.sendStatus(401);
        }

        //check if friend exists
        //read user json
        const data = await db.query("SELECT data FROM accounts WHERE email = ?", [req.body.email]);
        const json = JSON.parse(data[0].data);

        return res.json(json);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

api.listen(3000, () => console.log("API server is running on port 3000..."));