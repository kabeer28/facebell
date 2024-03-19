const mysql = require("mysql2/promise");

//Later on need to implement .env file for database credentials
//require('dotenv').config();

async function connect() {
    const con = await mysql.createConnection({
        host: "0.0.0.0",
        port: 3306,
        user: "root",
        password: "password",
        database: "facebell"
    });

    return con;
}

async function query(query,params = []) {
    const con = await connect();
    let [results, fields] = await con.execute(query, params);
    await con.end();

    return results;
}

module.exports = {
    connect,
    query
};