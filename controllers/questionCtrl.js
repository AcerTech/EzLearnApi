const { Question, validate } = require('../models/question');
const { QuestionType } = require('../models/questionType');
const { Quiz } = require('../models/quiz');
// const { answerSchema, Answer } = require('../models/answer');
// const { Grade } = require('../models/grade')
// const { Subject } = require('../model/subject')


exports.get = async (req, res) => {
    const question = await Question
        .find()
        // .populate('questionType', 'name -_id')
    res.send(question);
}

exports.getById = async (req, res) => {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send('The Question with the given ID was not found.');
    res.send(question);
}

exports.getQuestionsByQuizId = async (req, res) => {
    // const grade = await Grade.findById(req.body.gradeId);//we should get it with the body
    // if (!grade) return res.status(400).send('Invalid Grade.');

    // const quiz = await Quiz.findById(req.body.quizId);//we should get it with the body
    // if (!quiz) return res.status(400).send('Invalid Quiz.');

    // const subject = await Subject.findById(req.body.subjectId);//we should get it with the body
    // if (!subject) return res.status(400).send('Invalid subject.');

    const question = await Question
        .find({ quiz: req.params.id })
        // .populate('questionType', 'name -_id')
    // .populate('quiz', 'name -_id')
    res.send(question);


}

exports.add = async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const questionType = await QuestionType.findById(req.body.questionTypeId);//we should get it with the body
    if (!questionType) return res.status(400).send('Invalid Question Type.');

    const quiz = await Quiz.findById(req.body.quizId);//we should get it with the body
    if (!quiz) return res.status(400).send('Invalid Quiz.');

    let question = new Question({
        questionText: req.body.questionText,
        timer: req.body.timer,
        imgUrl: req.body.imgUrl,
        displayOrder: req.body.displayOrder,
        columensCont: req.body.columensCont,
        isActive: req.body.isActive,
        questionType: req.body.questionTypeId,
        quiz: req.body.quizId,
        answers: req.body.answers
    });

    try {
        question = await question.save();
        res.send(question);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let question = await Question.findById(req.params.id)
    if (!question) return res.status(404).send('The Question with the given ID was not found.');
    console.log(question)

    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        question[key] = value
    })

    try {
        question = await question.save();
        res.send(question);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {
    const question = await Question.findByIdAndRemove(req.params.id);
    if (!question) return res.status(404).send('The Question with the given ID was not found.');
    res.send(question);
};
