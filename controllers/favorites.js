const Recipe = require('../models/recipe')

module.exports = {
    create,
    deleteFavorite
}

async function create(req, res){
    try {
        const recipe = await Recipe.findById(req.params.id);
        recipe.favorites.push({username: req.user.username, userId: req.user._id});
        await recipe.save();
        res.status(201).json({data: 'favorite added'});
    } catch(err){
        res.status(400).json({err})
    }
}

async function deleteFavorite(req, res){
    console.log(req.params)
    try{
        const recipe = await Recipe.findOne({'favorites._id': req.params.id, 'favorites.username': req.user.username});
        recipe.favorites.remove(req.params.id);
        console.log(recipe)
        await recipe.save();
        res.status(202).json({data: 'favorite removed'});
    }catch(err){
        res.status(400).json({err})
    }
}