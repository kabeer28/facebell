//use express library for easy API creation
//use con from database.js, this is the connection to the MySQL database
const express = require("express");
const db = require("./database.js");
const encrypt = require("./encrypt.js");
const jwt = require("jsonwebtoken");

//create api
const api = express();
//enable use of json with express
api.use(express.json());

//account registration
api.post("/v1/account/register", async (req, res) => {
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
            return res.status(418);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

    //create new account
    //hash password 
    const password = await encrypt.hash(req.body.password);
    console.log(password);
    
    try {
        await db.query(`INSERT INTO accounts (email, password) VALUES ('`+ req.body.email+`','`+password+`')`);
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
        console.log(req.body.password);
        console.log(await encrypt.hash(req.body.password));
        console.log(account.password);
        console.log(await encrypt.hash(req.body.password) != account.password);
        if(!account || await encrypt.hash(req.body.password) != account.password) {
            res.json({message:"Invaild email or password."});
            return res.status(418);
        }

        //create jwt and give to user
        const token = jwt.sign({id:account.id},process.env.JWT_SECRET,{expiresIn: '1h'});
        res.json({token});
        return res.status(200); 
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

api.listen(3000, () => console.log("API server is running..."));