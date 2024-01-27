const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articalSchema = new Schema({
    title: String,
    body: String,
    numberOfLikes: Number
})

const Article = mongoose.model( "Article", articalSchema);

module.exports = Article;