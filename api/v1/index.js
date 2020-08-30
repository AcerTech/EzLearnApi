const express = require('express');
const router = express.Router();

router.use('/quizes', require('./quizes'));
router.use('/grades', require('./grades'));
router.use('/subjects', require('./subjects'));
router.use('/questions', require('./questions'));
router.use('/questionsTypes', require('./questionsTypes'));
router.use('/answers', require('./answers'));

module.exports = router