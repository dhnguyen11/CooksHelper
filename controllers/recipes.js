const Recipe = require('../models/recipe');

module.exports = {
    create,
    deleteRecipe,
    index,
    getOne,
    getFavorites
}

// Function to create a recipe
async function create(req, res) {
    try {
        // Attempts to create the recipe using the req.body values
        // Additionally adds the user
        let recipe = await Recipe.create({
            user: req.user,
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        })
        // Populates the user to allow use of username
        recipe = await recipe.populate('user')
        // Returns the newly created recipe
        res.status(201).json({recipe})
    } catch (err) {
        // If there is an error
        // Log out the error and return status 400
        console.log(err)
        res.status(400).json({err})
    }
}

// Function to delete a recipe
async function deleteRecipe(req, res) {
    try {
        // Searches for and deletes the recipe from the database
        await Recipe.deleteOne({_id: req.params.recipeId});
        res.json({data: 'recipe removed'});
    } catch (err) {
        // If there is an error
        // Return status 400
        res.status(400).json({err})
    }
}

// Function to get all of the recipes
async function index(req, res) {
    try {
        // Gets all of the recipes and populates the recipes with their creators
        // Then return the list of recipes
        const recipes = await Recipe.find({}).populate("user").exec();
        res.status(200).json({ recipes: recipes});
    } catch (err) {
        // If there is an error
        // Return status 400
        res.status(400).json({err})
    }
}

// Function to get a single recipe
// Used to show recipe details
async function getOne(req, res) {
    try {
        // Gets a single recipe and populates the user
        // If recipe is not found, return an error
        // Otherwise, return the recipe data
        const recipe = await Recipe.findOne({ '_id': req.params.recipeId }).populate("user").exec()
        if(!recipe) return res.status(404).json({err: 'Recipe not found'})
        res.status(200).json({recipe: recipe})
    } catch(err){
        // If there is an error
        // Log out the error and return status 400
        console.log(err)
        res.status(400).json({err})
    }
}

async function getFavorites(req, res) {
    try {
        const recipes = await Recipe.find({}).populate("user").exec();
        const favorites = recipes.filter((recipe) => {
            let found = false;
            recipe.favorites.forEach((favorite) => {
                if (favorite.username === req.user.username) {
                    found = true;
                }
            })
            return found;
        })
        res.status(200).json({ recipes: favorites});
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
}