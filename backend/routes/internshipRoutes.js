const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

router.get('/', internshipController.getAllInternships);
router.post('/', internshipController.createInternship);
router.put('/:id', internshipController.updateInternship);

module.exports = router;
