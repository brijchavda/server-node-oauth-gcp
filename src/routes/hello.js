// routes/users.js
const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

router.get('/', helloController.greetings);

module.exports = router;