const express = require('express');
const router = express.Router();

const teacherService = require('../services/teacherService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, teacherService.getAll);
router.get('/:id', ApiSecurity.requireLogin, teacherService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_teacher'), teacherService.add);
router.put('/update', ApiSecurity.requirePermits('manage_teacher'), teacherService.update);
router.delete('/:id', ApiSecurity.requirePermits('manage_teacher'), teacherService.delete);

module.exports = router;