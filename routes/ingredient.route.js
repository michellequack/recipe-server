const express = require('express');
const app = express();
const ingredientRoute = express.Router();

// Model
let Ingredient = require('../models/ingredient');


// Routes
ingredientRoute.route('/').get((req, res) => {
    Ingredient.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = ingredientRoute;