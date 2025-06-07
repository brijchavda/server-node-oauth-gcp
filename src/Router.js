const express = require('express');
const router = express.Router();

// Import routes
const helloRoutes = require('./routes/hello');

// Register routes
router.use('/hello', helloRoutes);
router.use('/public/hello', helloRoutes);

module.exports = router;