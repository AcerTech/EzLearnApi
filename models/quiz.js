const mongoose = require('mongoose');
const Joi = require('joi');

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 50 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    subject: {
        //Refrence doc
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
        
        //Empeded doc
        // type: new mongoose.Schema({
        //     name: {
        //         type: String,
        //         required: true
        //     }
        // })
    }
});

function validateQuiz(quiz) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255),
        isActive: Joi.boolean(),
        displayOrder: Joi.number(),
        subjectId: Joi.objectId().required()
    });
    return schema.validate(quiz);
}

exports.validate = validateQuiz
module.exports.Quiz = mongoose.model('Quiz', quizSchema);
exports.quizSchema = quizSchema