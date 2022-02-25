const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');

//----------- Public Routes -----------//
router.post('/', isAuthenticated, recipesCtrl.create)
router.delete('/:recipeId', isAuthenticated, recipesCtrl.deleteRecipe)
router.get('/', recipesCtrl.index)
router.get('/favorites', recipesCtrl.getFavorites)
router.get('/:recipeId', recipesCtrl.getOne)

function isAuthenticated(req, res, next){
    if(req.user) {
        next()
    } else {
        res.status(401).json({data: 'Not Authorized!'})
    }
}

module.exports = router;