const express = require('express');
const router = express.Router();

const gradeService = require('../services/gradeService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, gradeService.getAll);
router.get('/:id', ApiSecurity.requireLogin, gradeService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_grade'), gradeService.add);
router.delete('/:id', ApiSecurity.requirePermits('manage_grade'), gradeService.delete);
router.put('/:id', ApiSecurity.requirePermits('manage_grade'), gradeService.update);

module.exports = router;