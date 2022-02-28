const express = require('express');
const router = express.Router();
const groceriesCtrl = require('../../controllers/groceries');

//----------- Public Routes -----------//
router.get("/", groceriesCtrl.index)
router.put("/:recipeId", groceriesCtrl.addItems)
router.put("/", groceriesCtrl.deleteAll)

module.exports = router;