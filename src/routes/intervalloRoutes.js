const express = require('express');
const router = express.Router();
const { getIntervalli, getIntervalloById, createIntervallo, updateIntervallo, deleteIntervallo } = require('../controllers/intervalloController');

router.get('/', getIntervalli);
router.get('/:id', getIntervalloById);
router.post('/', createIntervallo);
router.put('/:id', updateIntervallo);
router.delete('/:id', deleteIntervallo);

module.exports = router;