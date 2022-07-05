const mongoose = require('mongoose')
const { v4 } = require('uuid')
const AssetSchema = require('./Asset')
const ContributorSchema = require('./Contributor')

const InnovationSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Tags: {
        type: [String],
        required: true
    },
    Roles: {
        type: [String],
        required: true
    },
    Assets: {
        type: [AssetSchema]
    },
    Status: {
        type: String,
        enum: ['open', 'in development', 'finished'],
        required: true,
        default: 'open'
    },
    DoC: {
        type: Number,
        default: new Date().getTime()
    },
    DoF: {
        type: Number,
        default: undefined
    },
    Contributors: {
        type: [ContributorSchema],
        default: []
    }
})

module.exports = InnovationSchema