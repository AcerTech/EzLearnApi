const mongoose = require('mongoose');
const Joi = require('joi');
const { answerSchema, Answer } = require('./answer');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    timer: { type: Number, default: 0 },
    imgUrl: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    columensCont: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questionType: {type:String},
    answers: [answerSchema]
});

function validateQuestion(question) {
    const schema = Joi.object({
        questionText: Joi.string().min(3).max(255).required(),
        imgUrl: Joi.string().max(255),
        timer:Joi.number().default(0),
        displayOrder: Joi.number(),
        isActive: Joi.boolean(),
        columensCont:Joi.number().default(0),
        quizId: Joi.objectId().required(),
        questionType: Joi.string(),
        answers:Joi.array()
    });
    return schema.validate(question);
}

exports.validate = validateQuestion
exports.questionSchema = questionSchema
exports.Question = mongoose.model('Question', questionSchema)