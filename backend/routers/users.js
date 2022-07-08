const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/all-user', userController.getAllUser);
router.post('single-user', userController.getSingleUser);

router.post('/add-user', userController.postAddUser);
router.post('/edit-user', userController.postEditUser);
router.post('/delete-user', userController.getDeleteUser);

router.post('/change-password', userController.changePassword);

module.exports = router;