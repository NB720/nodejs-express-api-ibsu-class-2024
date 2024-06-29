const express = require('express');
const router = express.Router();

const CourseModel = require('../models/course'); 
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', courseService.getAll);
router.get('/:id', courseService.getOne);
router.post('/add', courseService.add);
router.delete('/:id', courseService.delete);
router.put('/:id', courseService.update);

module.exports = router;
