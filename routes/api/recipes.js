const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');

//----------- Public Routes -----------//
router.post('/', isAuthenticated, recipesCtrl.create)
router.delete('/', isAuthenticated, recipesCtrl.deleteRecipe)
router.get('/', recipesCtrl.index)


function isAuthenticated(req, res, next){
    if(req.user) {
        next()
    } else {
        res.status(401).json({data: 'Not Authorized!'})
    }
}

module.exports = router;