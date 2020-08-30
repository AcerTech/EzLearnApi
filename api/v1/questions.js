const express = require('express');
const router = express.Router();

const questionCtrl = require('../../controllers/questionCtrl');

router.get('/', questionCtrl.get)
router.get('/:id', questionCtrl.getById)
router.get('/byquizid/:id', questionCtrl.getQuestionsByQuizId)
router.post('/', questionCtrl.add)
router.put('/:id', questionCtrl.update)
router.delete('/', questionCtrl.delete)


module.exports = router;