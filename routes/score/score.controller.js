const express = require('express');
const { scoreDtoValidator, addScoreDto, updatedScoreDto, deleteScoreDto } = require('../../validators/score.validator');
const router = express.Router();
const { getScore, postScore, updateScore, deleteScore } = require('./score.service');

router.get('/:gameId', async (req,res,next) => {
    try {
        const score = await getScore(req.params.gameId);
        res.json(score);
    } catch (error) {
        next(error);
    }
});

router.post('/', scoreDtoValidator(addScoreDto), async (req,res,next) => {
    const { gameId, userId, score } = req.body;
    try {
        const newScore = await postScore({ gameId, userId, score });
        res.json(newScore);
    } catch (error) {
        next(error);
    }
})

router.put('/:gameId', scoreDtoValidator(updatedScoreDto), async (req,res,next) => {
    try {
        const { userId, score } = req.body;
        const updatedScore = await updateScore(req.params.gameId, userId, score);
        if (updatedScore === null) {
            res.status(400).send({ error: 'score not found' });
        } else {
            res.json(updatedScore);
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/:gameId', scoreDtoValidator(deleteScoreDto), async (req,res,next) => {
    try {
        const deletedScore = await deleteScore(req.params.gameId, req.body.userId);
        if (deletedScore === null) {
            res.status(400).send({ error: 'score not found' });
        } else {
            res.json(deletedScore);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;
