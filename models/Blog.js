const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var BlogModel = mongoose.model('blogs',blogSchema)
module.exports = BlogModel