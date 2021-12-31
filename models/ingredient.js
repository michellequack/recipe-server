const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Ingredient = new Schema({
    ingredientId: {
        type: Number
     },
     name: {
        type: String
     },
     recipeId: {
        type: String
     }
}, {
   collection: 'ingredients'
})

module.exports = mongoose.model('Ingredient', Ingredient)