const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/get-all-orders', orderController.getAllOrder);
router.post('/order-by-user', orderController.getOrderByUser);
router.post('/create-order', orderController.postCreateOrder);
router.post('/update-order', orderController.postUpdateOrder);
router.post('/delete-order', orderController.postDeleteOrder);

module.exports = router;
