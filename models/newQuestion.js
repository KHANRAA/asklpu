const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;
const {newAnswerSchema} = require('../models/newAnswer');
const {userSchema} = require('../models/user');
// const uniqueValidator = require('mongoose-unique-validator');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const newQuestionSchema = new Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    posted_by: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    answers: [{
        type: Schema.Types.ObjectID,
        ref: 'Answer'
    }],
    post_date: {
        type: Date,
        default: Date.now()
    },
    details: {
        type: String,
        minlength: 5,
        required: true
    },
    viewd_by: [{
        type: Schema.Types.ObjectID,
        ref: 'User'

    }],
    upvote_points:{
        type: Number,
        default: 0
    },
    voted_by: [{
        type: Schema.Types.ObjectID,
        ref: 'User'
    }]
});

const Question = mongoose.model('Question', newQuestionSchema, 'questions');

function validateQuestion(question) {
    const schema = {
        title: Joi.string().min(5).required(),
        details: Joi.string().min(5).required(),
    };
    return Joi.validate(question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;