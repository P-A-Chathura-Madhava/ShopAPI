const express = require('express');
const ItemController = require('../controller/ItemController');

const router = express.Router();

router.post('/saveItem', ItemController.saveItem);
router.put('/updateItem', ItemController.updateItem);
router.delete('/deleteItem', ItemController.deleteItem);
router.get('/searchItem', ItemController.searchItem);
router.get('/getAllItems', ItemController.getAllItems);

module.exports = router;