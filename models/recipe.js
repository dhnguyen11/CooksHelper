const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const recipeSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    ingredients: [String],
    instructions: [String],
    favorites: [favoriteSchema], // <- 1:M relationship with favorites
    glutenFree: Boolean,
    vegan: Boolean,
})

module.exports = mongoose.model('Recipe', recipeSchema)