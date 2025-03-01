const express = require('express');
const router = express.Router();
const requestController = require('../Controllers/requestController');

router.post('/submit', requestController.submitRequest);
router.get('/all', requestController.getRequests);
router.post('/update/:id', requestController.updateRequestStatus);

module.exports = router;
