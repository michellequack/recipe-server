const { request } = require('express');
const express = require('express');
const app = express();
const recipeRoute = express.Router();

// Model
let Recipe = require('../models/recipe');

// Create
recipeRoute.route('/create').post((req, res, next) => {
    console.log('Creating recipe');

    const recipe = new Recipe({
        name: req.body.name,
        category: req.body.category,
        directions: req.body.directions,
        numberOfServings: req.body.numberOfServings
    });

    req.body.ingredients.forEach(ing => {
        recipe.ingredients.push(ing);
    })

    recipe.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

})



// Get list
recipeRoute.route('/').get((req, res) => {
    Recipe.find((error, data) => {
        if (error) {
        return next(error)
        } else {
        res.json(data)
        }
    })
})

// Update 
recipeRoute.route('/update/:id').put((req, res, next) => {
    const recipe = new Recipe({
        _id: req.params.id,
        name: req.body.name,
        category: req.body.category,
        directions: req.body.directions,
        numberOfServings: req.body.numberOfServings
    });

    req.body.ingredients.forEach(ing => {
        recipe.ingredients.push(ing);
    })

    Recipe.findByIdAndUpdate(req.params.id, recipe, {new: true})
    .then(recipe => {
        if(!recipe) {
            return res.status(404).send({
                message: "Recipe not found with id " + req.params.id
            });
        }
        res.send(recipe);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recipe not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating recipe with id " + req.params.id + " err:" + err
        });
    });
})

// Delete
recipeRoute.route('/delete/:id').delete((req, res, next) => {
    Recipe.findByIdAndRemove(req.params.id)
    .then(recipe => {
        if(!recipe) {
            return res.status(404).send({
                message: "Recipe not found with id " + req.params.id
            });
        }
        res.send({message: "Recipe deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Recipe not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete recipe with id " + req.params.id + " " + err
        });
    });
})

module.exports = recipeRoute;
