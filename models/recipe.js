const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const recipeSchema = mongoose.Schema({
    
})