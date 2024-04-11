const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeByTitle, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

router.get('/', getAllRecipes);                      
router.get('/title/:title', getRecipeByTitle);      
router.post('/', createRecipe);                     
router.put('/:id', updateRecipe);                   
router.delete('/:id', deleteRecipe);                

module.exports = router;


