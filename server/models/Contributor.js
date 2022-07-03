const mongoose = require('mongoose')

const ContributorSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    roles: [String]
})

module.exports = ContributorSchema