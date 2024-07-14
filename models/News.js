const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true,
        
    },
    imageUrl: {
        type: String,
        required: false,
        
       
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const News = mongoose.model("News", NewsSchema);

module.exports = News;

