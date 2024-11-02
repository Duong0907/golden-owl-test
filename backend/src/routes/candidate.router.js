const candidateController = require('../controllers/candidate.controller.js');
const express = require('express');

const router = express.Router();

router.get('/', candidateController.getAllCandidates);
router.get('/sbd/:sbd', candidateController.getBySBD);
router.get('/report', candidateController.getReport);
router.get('/top', candidateController.getTopCandidates);

module.exports = router;
