const bcrypt = require("bcrypt");

//code to hash passwords before they are stored in the database
async function hash(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

//code to compare password with stored hash
async function compare(password, stored) {
    const match = bcrypt.compare(password, stored);
    return match;
}

module.exports = {
    hash,
    compare
};