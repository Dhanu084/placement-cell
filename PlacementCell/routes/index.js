const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.use('/students', require('./students/students'));
router.get('/', homeController.home);

module.exports = router;
