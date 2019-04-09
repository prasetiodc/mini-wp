const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String,
    created_at: Date
})

let Article = mongoose.model('Articles',articleSchema)

module.exports = Article