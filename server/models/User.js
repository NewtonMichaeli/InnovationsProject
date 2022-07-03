const mongoose = require('mongoose')
const InnovationSchema = require('./Innovation')

const UserSchema = mongoose.Schema({
	Fname: {
        type: String,
        required: true
    },
	Sname: {
        type: String,
        required: true
    },
	Username: {
        type: String,
        required: true
    },
	Password: {
        type: String,
        required: true
    },
	Email: {
        type: String,
        required: true
    },
	Profile_Pic: {
        type: Number,
        default: 1
    },
    IsAdmin: {
        type: Boolean,
        required: true
    },
    Innovations: {
        type: [InnovationSchema],
        default: []
    }
})

module.exports = mongoose.model('Users', UserSchema)