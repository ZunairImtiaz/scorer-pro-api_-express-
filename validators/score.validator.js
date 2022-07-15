const joi = require('joi');
const httpError = require('http-errors');

const addScoreDto = joi.object().keys({
    gameId: joi.string().required(),
    userId: joi.string().required(),
    score: joi.number().required()
});

const updatedScoreDto = joi.object().keys({
    userId: joi.string().required(),
    score: joi.number().required()
});

const deleteScoreDto = joi.object().keys({ userId: joi.string().required() });

function scoreDtoValidator(validator) {
    return async function(req, res, next) {
        try {
            const validateBody = await validator.validateAsync(req.body);
            req.body = validateBody;
            next();
        } catch (error) {
            if (error.isJoi) {
                return next(httpError(422, { message: error.message }));
            }
            next(httpError(500));
        }
    }
}

module.exports = { addScoreDto, updatedScoreDto, deleteScoreDto, scoreDtoValidator};