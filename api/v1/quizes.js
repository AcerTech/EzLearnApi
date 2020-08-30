const express = require('express');
const router = express.Router();

const quizCtrl = require('../../controllers/quizCtrl');

router.get('/', quizCtrl.get)
router.get('/:id', quizCtrl.getById)
router.post('/', quizCtrl.add)
router.put('/:id', quizCtrl.update)
router.delete('/', quizCtrl.delete)


module.exports = router;