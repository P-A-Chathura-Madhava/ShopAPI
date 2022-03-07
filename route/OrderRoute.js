const express = require('express');
const OrderController = require('../controller/OrderController');

const router = express.Router();

router.post('/saveOrder', OrderController.saveOrder);

module.exports = router;