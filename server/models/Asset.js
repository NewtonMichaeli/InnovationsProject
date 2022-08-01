const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
    path: {
        type: String,
        reuired: true
    },
    originalname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
})

module.exports = AssetSchema