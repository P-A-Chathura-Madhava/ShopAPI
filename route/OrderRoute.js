const express = require('express');
const OrderController = require('../controller/OrderController');

const router = express.Router();

router.post('/saveOrder', OrderController.saveOrder);
router.get('/getAllOrders', OrderController.getAllOrders);

module.exports = router;