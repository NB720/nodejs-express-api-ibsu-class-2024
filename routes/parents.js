const express = require('express');
const router = express.Router();

const parentService = require('../services/parentService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, parentService.getAll);
router.get('/:id', ApiSecurity.requireLogin, parentService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_parent'), parentService.add);
router.delete('/:id', ApiSecurity.requirePermits('manage_parent'), parentService.delete);
router.put('/:id', ApiSecurity.requirePermits('manage_parent'), parentService.update);

module.exports = router;