const Recipe = require('../models/recipe');
const { post } = require('../routes/api/recipes');

module.exports = {
    create,
    deleteRecipe
}

async function create(req, res) {
    console.log(req.body, '<- req.body')
    try {
        let recipe = await Recipe.create({
            user: req.user,
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        })
        console.log(recipe)
        recipe = await recipe.populate('user')
        res.status(201).json({recipe})
    } catch (err) {
        console.log(err)
        res.status(400).json({err})
    }
}

async function deleteRecipe(req, res) {
    try {
        await Recipe.deleteOne({_id: req.params.id});
        res.json({data: 'recipe removed'});
    } catch (err) {
        res.status(400).json({err})
    }
}