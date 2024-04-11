const Recipe = require('../api/recipeModel');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getRecipeByTitle = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ title: req.params.title });
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createRecipe = async (req, res) => {
    try {
        let recipe = new Recipe(req.body);
        recipe = await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        if (error.code === 11000) {  // Check for duplicate
            res.status(409).send('Recipe already exists');
        } else {
            res.status(500).send(error.message);
        }
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.send('Recipe deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
