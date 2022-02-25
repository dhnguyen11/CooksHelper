const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../../controllers/favorites');

//----------- Public Routes -----------//
router.post('/recipes/:id/favorites', favoritesCtrl.create)
router.delete('/favorites/:id', favoritesCtrl.deleteFavorite)


module.exports = router;