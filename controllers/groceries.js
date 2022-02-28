const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
    index,
    addItems,
    deleteAll
}

async function index(req, res) {
    try {
        const user = await User.findOne({email: req.user.email});
        const groceries = user.groceries
        res.status(200).json({groceries: groceries})
    }catch(err){
        res.status(400).json({err})
    }
}

async function addItems(req, res) {
    try {
        const user = await User.findOne({email: req.user.email});
        const recipe = await Recipe.findOne({ '_id': req.params.recipeId }).populate("user").exec();
        const groceries = recipe.ingredients;
        groceries.forEach((grocery) => {
            user.groceries.push(grocery);
        })
        await user.save();
        res.status(201).json({data: 'Added Groceries'})
    }catch(err){
        res.status(400).json({err})
    }
}

async function deleteAll(req, res){
    try {
        const user = await User.findOne({email: req.user.email});
        user.groceries = [];
        await user.save();
        res.status(202).json({data: 'Removed Groceries'})
    }catch(err){
        res.status(400).json({err})
    }
}