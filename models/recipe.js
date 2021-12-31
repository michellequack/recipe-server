const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Recipe = new Schema({
    recipeId: {
        type: Number
     },
     name: {
        type: String
     },
     category: {
        type: String
     },
     directions: {
        type: String
     },     
     numberOfServings: {
        type: String
     },
     author: {
        type: String
     },
     ingredients: [{
        type: String
    }]
}, {
   collection: 'recipes'
})

module.exports = mongoose.model('Recipe', Recipe)