const Recipe = require('../models/recipe');

module.exports = {
    create,
    deleteRecipe,
    index
}

async function create(req, res) {
    try {
        let recipe = await Recipe.create({
            user: req.user,
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        })
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

async function index(req, res) {
    try {
        const recipes = await Recipe.find({}).populate("user").exec();
        res.status(200).json({ recipes: recipes});
    } catch (err) {
        res.status(400).json({err})
    }
}