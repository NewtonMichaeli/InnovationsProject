const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
    path: {
        type: String,
        reuired: true
    },
    originalName: {
        type: String,
        required: true
    },
})

module.exports = AssetSchema