const jwt = require('jsonwebtoken')

// Extract relevant fields and generate token
const signNewUserToken = ({Username, Email, IsAdmin, _id}) => jwt.sign(
    JSON.stringify({Email, Username, IsAdmin, _id: _id.toString()}),
    process.env.TOKEN_SECRET
)

module.exports = signNewUserToken