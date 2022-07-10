const mongoose = require('mongoose')

const SharedProjectSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    }
})

module.exports = SharedProjectSchema