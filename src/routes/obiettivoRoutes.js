const express = require('express');
const router = express.Router({ mergeParams: true });
const { getObiettiviByIntervallo, associaObiettivo } = require('../controllers/obiettivoController');

router.get('/', getObiettiviByIntervallo);
router.post('/', associaObiettivo);

module.exports = router;